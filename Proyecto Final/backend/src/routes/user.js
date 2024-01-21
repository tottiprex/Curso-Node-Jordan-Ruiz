const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware');
const { generarTokenRestablecimiento } = require('../authService');
const { sendEmail } = require('../emailService');

router.post('/password-reset', async (req, res) => {
  try {
    const token = await generarTokenRestablecimiento(req.body.email);
    sendEmail(
      'limonambrosoli@gmail.com',
      'Restablecimiento de contraseña',
      `Cambiar contraseña .. http://localhost:5173/#/restablecer-contrasena/${token}`
    );
    res.send(
      'Se ha enviado un enlace de restablecimiento de contraseña: ' + token
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/password-reset/:token', async (req, res) => {
  try {
    const user = await userSchema.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .send('Token de restablecimiento invalido o expirado');
    }
    //hashear la nueva contraseña
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    user.password = req.body.password;
    await userSchema.updateOne(
      { _id: user._id },
      {
        $set: {
          password: passwordHash,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
      }
    );
    res.send('Contraseña actualizada correctamente');
  } catch (error) {
    res.status(500).send('Error al restablecer la contraseña');
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  try {
    res.send('Exitoso');
  } catch (error) {
    res.status(400).send(error);
  }
});

//register
router.post('/register', async (req, res) => {
  try {
    const newUser = new userSchema(req.body);
    await newUser.save();
    res.status(201).send('Usuario registrado con exito');
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error('Credenciañes invalidads');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//create user
router.post('/user', (req, res) => {
  const user = new userSchema(req.body);
  user
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

//get all users
router.get('/users', (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

//get a user
router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => {
      data.password = undefined;
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

//update user
router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = new userSchema(req.body);

  if (user.password) user.password = await bcrypt.hash(user.password, 12);
  userSchema
    .updateOne({ _id: id }, { $set: user })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

//delete user
router.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

module.exports = router;
