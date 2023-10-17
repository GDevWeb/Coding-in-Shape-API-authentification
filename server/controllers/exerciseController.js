const Exercise = require('../models/exerciseModel');

const exerciseController = {

    // 01. Ajouter un exercice :
    createExercise: async (req, res) => {
        const {
            name,
            description,
            image,
            type,
            muscle,
        } = req.body;

        try {
            // 01.a Vérifier si l'exercice existe déjà dans la base de données et contrôle par la casse :
            const exercise = await Exercise.findOne({ name: name.toLowerCase() });
            if (exercise) {
                return res.status(400).json({ msg: "Cet exercice existe déjà" });
            }

            // 01.b Si l'exercice n'existe pas, on le crée :
            const newExercise = new Exercise({
                name: name.toLowerCase(),
                description,
                image,
                type,
                muscle,
            });

            // 01.c Sauvegarder l'exercice dans la base de données :
            await newExercise.save();
            res.status(201).json({ msg: "Nouvel exercice créé" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
        }
    },

    // 02. Afficher tous les exercices :
    getAllExercises: async (req, res) => {
        try {
            const exercises = await Exercise.find();
            res.json(exercises);

        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: "Erreur client", error });
            res.status(500).json({ msg: "Erreur serveur", error });
        }
    },

    // 03. Afficher un exercice par son id :
    getExerciseById: async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.params.id);

            if (!exercise) {
                return res.status(404).json({ msg: "Cet exercice n'existe pas" });
            }
            res.json(exercise);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erreur serveur" });
        }
    },

    // 04. Modifier un exercice :
    updateExercise: async (req, res) => {
        const {
            name,
            description,
            image,
            type,
            muscle,
        } = req.body;

        try {
            await Exercise.findOneAndUpdate(
                { _id: req.params.id },
                {
                    name: name.toLowerCase(),
                    description,
                    image,
                    type,
                    muscle,
                },

                { new: true }
            );

            res.json({ msg: "Exercice modifié" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erreur serveur" });
        }
    },

    // 05. Supprimer un exercice :
    deleteExercise: async (req, res) => {
        try {
            await Exercise.findByIdAndDelete(req.params.id);
            res.json({ msg: "Exercice supprimé" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erreur serveur" });
        }
    },

    // 06. Afficher les exercices par type :
    getExercisesByType: async (req, res) => {
        try {
            const type = req.params.type;

            const exercises = await Exercise.find({ type: { $regex: type, $options: "i" } });
            console.log(exercises);

            if (exercises.length === 0) {
                console.log(exercises);
                return res.status(404).json({ msg: "Aucun exercice trouvé pour ce type" });
            }

            res.json(exercises);
            console.log(exercises);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erreur serveur" });
        }
    },

    // 07. Afficher les exercices par muscle : 
    getExercisesByMuscle: async (req, res) => {
        try {
            const muscle = req.params.muscle;

            const exercises = await Exercise.find({ muscle: { $regex: muscle, $options: "i" } });
            console.log(exercises);

            if (exercises.length === 0) {
                console.log(exercises);
                return res.status(404).json({ msg: "Aucun exercice trouvé pour ce muscle" });
            }

            res.json(exercises);
            console.log(exercises);
        }catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erreur serveur" });
        }
    },


    // 08. Fonction randomRoutine, renvoie un tableau de 5 exercices aléatoires de ce type :
    getRandomRoutine: async (req, res) => {
        try {
            const muscles = ["cervicaux", "deltoïdes", "lombaires", "hanches", "jambes"];
            // 07.a j'initialise un tableau vide qui va contenir les exercices aléatoires
            const selectedExercises = [];

            // 07.b je boucle sur le tableau muscles pour récupérer les exercices par type :
            for (let i = 0; i < muscles.length; i++) {

                // 07.c je récupère les exercices par type :
                const exercises = await Exercise.find({ type: muscles[i] });

                // 07.d je vérifie si des exos existent pour ce type : 
                if (exercises.length > 0) {


                    // 07.e je récupère un exercice aléatoire dans le tableau :
                    const randomExercises = exercises[Math.floor(Math.random() * exercises.length)];

                    // 07.f je push l'exercice dans le tableau :
                    selectedExercises.push(randomExercises);
                }
            }

            // 07.g je mélange le tableau et je récupère les 5 premiers exercices :
            const shuffledExercises = selectedExercises.sort(() => Math.random() - 0.5).slice(0, 5);

            // 07.h je renvoie le tableau de 5 exercices aléatoires :
            res.json(shuffledExercises);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erreur serveur getRandomRoutine"});
        }
    },
};

module.exports = exerciseController;
