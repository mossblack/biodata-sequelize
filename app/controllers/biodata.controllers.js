const db = require('../models');
const Biodata = db.biodata;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nama) {
        res.status(400).send({
            message: 'Konten tidak boleh kosong'
        });
        return;
    }

    const biodata = {
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
    };

    Biodata.create(biodata)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error dalam memasukan biodata.'
            });
        });
};

exports.findAll = (req, res) => {
    Biodata.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error ketika mendapatkan biodata.'
            });
        });
};

exports.findOne = (req, res) => {
    Biodata.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error ketika mencari biodata.'
            });
        });
};

exports.delete = (req, res) => {
    Biodata.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: 'sukses menghapus biodata pada id = ' + req.params.id,
        })
    )
    .catch(err => {
        res.status(500).send({
            message: err.message || 'gagal menghapus biodata pada id = ' + req.params.id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Biodata.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "biodata sukses diupdate"
            });
        } else {
            res.send({
                message: `Tidak bisa update id = ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "gagal update biodata" + id
        });
    });
};
