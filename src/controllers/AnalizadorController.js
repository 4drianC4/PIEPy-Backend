const analizadorService = require('../services/AnalizadorService');

module.exports = {
    async analizarCodigo(req, res) {
        try {
            const {codigo} = req.body;
            const resultado = await analizadorService.analizadorCodigo(codigo);
            res.status(200).json({resultado});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
};