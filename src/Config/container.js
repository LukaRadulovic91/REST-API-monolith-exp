const { createContainer, asClass, asValue, asFunction } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const AppointmentService = require('../Domain/Services/AppointmentService');
const AppointmentRepository = require('../Domain/Repositories/AppointmentRepository');

function configureContainer(app) {
    const container = createContainer();

    container.register({
        appointmentService: asClass(AppointmentService).scoped(),
        appointmentRepository: asClass(AppointmentRepository).scoped(),
        // registruj još servisa/repozitorijuma po potrebi
    });

    // Middleware koji za svaki zahtev kreira novi DI scope
    app.use(scopePerRequest(container));
}

module.exports = configureContainer;
