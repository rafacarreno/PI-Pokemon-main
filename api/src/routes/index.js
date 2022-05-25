const { Router } = require('express');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type, Pokemon_Type } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//---------------------------------------------------------------API DATA-----------------------------------------------------------------------------------------------------------

// Ruta principal: debe contener

// Imagen
// Nombre
// Tipos (Electrico, Fuego, Agua, etc)

//https://pokeapi.co/api/v2/pokemon

const apiData = async (api) => {
    try {
        const urls = await axios.get(api);
        const urlsData = urls.data.results?.map((e) => axios.get(e.url));
        const pokemonsData = await axios.all(urlsData);
        //console.log('DATA DE URLS', pokemonsData);
        const pokemons = pokemonsData?.map((el) => {
            return {
                id: el.data.id,
                name: el.data.name,
                height: el.data.height,
                weight: el.data.weight,
                hp: el.data.stats[0].base_stat,
                attack: el.data.stats[1].base_stat,
                defense: el.data.stats[2].base_stat,
                speed: el.data.stats[5].base_stat,
                types: el.data.types.map((t) => t.type.name),
                img: el.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default,
            };
        });
        return pokemons;
    } catch (error) {
        console.log(error);
    }
};


//-------------------------------------------------------------------DB  DATA-----------------------------------------------------------------------------------------------------------

const dbData = async () => {
    try {
        const dbData = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] },
            },
        });

        const pokeDB = dbData?.map((e) => {
            return {
                id: e.dataValues.id,
                name: e.dataValues.name,
                height: e.dataValues.height,
                weight: e.dataValues.weight,
                hp: e.dataValues.hp,
                attack: e.dataValues.attack,
                defense: e.dataValues.defense,
                speed: e.dataValues.speed,
                types: e.dataValues.types.map((t) => t.dataValues.name),
                img: e.dataValues.img,
            };
        });
        return pokeDB;
    } catch (error) {
        console.log(error);
    }
};

//-------------------------------------------------------------------ALL  DATA----------------------------------------------------------------------------------

const getAllData = async () => {
    try {
        const getApiData = await apiData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
        const getDbData = await dbData();
        const allData = [...getApiData, ...getDbData];
        return allData;
    } catch (error) {
        console.log(error);
    }
};


//---------------------------------------------------------- FIND ONE POKÉMON DATA--------------------------------------------------------------------------------------
const findPokemon = async (id) =>{
    try {
        const apiID = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeData = {            
            id: apiID.data.id,
            name: apiID.data.name,
            height: apiID.data.height,
            weight: apiID.data.weight,
            hp: apiID.data.stats[0].base_stat,
            attack: apiID.data.stats[1].base_stat,
            defense: apiID.data.stats[2].base_stat,
            speed: apiID.data.stats[5].base_stat,
            types: apiID.data.types.map((t) => t.type.name),
            img: apiID.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default,

        };
        return pokeData;
    } catch(error){
        console.log(error);
    }
};


//------------------------------------------------------GET /pokemons: & /pokemons?name="..."-------------------------------------------------------------------

router.get('/pokemons', async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const dbPoke = await dbData();
            const findDbPoke = dbPoke.find((e) => e.name === name);
            if (findDbPoke) {
                return res.send(findDbPoke);
            } else {
                const findApiPoke = await findPokemon(name);
                //console.log('ACAAAA->>>>>>>>', findApiPoke);
                return findApiPoke ? res.send(findApiPoke) : res.status(400).send(`No se encontro el Pokémon: ` + name);
            }
        } else {
            const allPokes = await getAllData();
            res.send(allPokes);
        }

    } catch (error) {
        console.log(error);
    }
});



//-------------------------------------------------------- GET /pokemons/{idPokemon}:-----------------------------------------------------------------------------

router.get('/pokemons/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (id.includes('-')) {
            const dbPoke = await dbData();
            const findDbPoke = dbPoke.find((e) => e.id === id);
            return findDbPoke ? res.send(findDbPoke) : res.status(404).send(`No se encontro el Pokémon, en la DB, con el ID: ${id}`);
        } else {
            const findApiPoke = await findPokemon(id);
            return findApiPoke ? res.send(findApiPoke) : res.status(404).send(`No se encontro el Pokémon, en la API, con el ID: ${id}`);
        }
    } catch (error) {
        console.log(error);
    }
});

//-----------------------------------------------------------POST /pokemons:-------------------------------------------------------------------------------------

router.post('/pokemons', async (req, res) => {
    try {
        const addPokemon = await Pokemon.create({
            name: req.body.name,
            height: req.body.height,
            weight: req.body.weight,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            speed: req.body.speed,
            img: req.body.img,
        });

        //console.log('ADDPOKEMON', addPokemon);

        const typesByDB = await Type.findAll({
            where: {
                name: {
                    [Op.in]: req.body.types,
                },
            },
        });

        await addPokemon.addTypes(typesByDB);
        res.status(200).send(`¡El Pokémon ${req.body.name} ha sido creado exitosamente!`);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errorMsg: error });
    }
});

//---------------------------------------------------------------- TYPES DATA-------------------------------------------------------------------------------------
const typesData = async () => {
    try {
        const apiInfo = await axios.get('https://pokeapi.co/api/v2/type');
        const types = apiInfo.data?.results.map((e) => {
            return {
                name: e.name
            }
        });
        const dbTypes = await Type.findAll();
        if(dbTypes) {
            await Type.bulkCreate(types)
        } 
    } catch(error){
        console.log(error);
    }
};

const getTypes = async () => {
    try{
        let typesDb = await Type.findAll();
        //console.log(typesDb);
        typesDb = typesDb.map((e) => e.toJSON());
        //console.log(typesDb);
        return typesDb;
    } catch (error){
        console.log(error);
    }
};

//-------------------------------------------------------------GET /types-----------------------------------------------------------------------------------------
router.get('/types', async (req, res) => {
    try{
        await typesData();
        let allTypes = await getTypes();
        allTypes = allTypes.map((e) => {
            return{
                id:e.id,
                name:e.name,
            };
        });
        res.status(200).send(allTypes);
    }catch(error){
        console.log(error);
    }
});

module.exports = router;
