const mongoose =  require('mongoose');
const questions = require('./routes/questions');
const sections = require('./routes/sections');
const candidates = require('./routes/candidateProfile');
const candidateAcademicInfo = require('./routes/candidateAcademic');
const candidateProfessionalInfo = require('./routes/candidateProfessional');
const candidateReferenceInfo = require('./routes/candidateReference');
const users = require('./routes/users');
const test = require('./routes/tests');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/recruitment')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/questions', questions);
app.use('/api/sections', sections);
app.use('/api/candidates', candidates);
app.use('/api/academicinfo', candidateAcademicInfo);
app.use('/api/professionalinfo', candidateProfessionalInfo);
app.use('/api/referenceinfo', candidateReferenceInfo);
app.use('/api/users', users);
app.use('/api/test', test);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


