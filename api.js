// API REST para el Dashboard de Hospital
class HospitalAPI {
    constructor() {
        // Inicializar datos si no existen en localStorage
        if (!localStorage.getItem('hospitalData')) {
            this.resetData();
        }
    }

    // Método para obtener todos los departamentos
    async getDepartments() {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            return {
                status: 200,
                data: Object.keys(data).map(key => ({
                    id: key,
                    name: data[key].name
                }))
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener departamentos'
            };
        }
    }

    // Método para obtener un departamento específico
    async getDepartment(departmentId) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                return {
                    status: 200,
                    data: data[departmentId]
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener el departamento'
            };
        }
    }

    // Método para obtener todas las habitaciones de un departamento
    async getRooms(departmentId) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                return {
                    status: 200,
                    data: data[departmentId].rooms
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener las habitaciones'
            };
        }
    }

    // Método para obtener una habitación específica
    async getRoom(departmentId, roomId) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                const room = data[departmentId].rooms.find(r => r.id === roomId);
                if (room) {
                    return {
                        status: 200,
                        data: room
                    };
                }
                return {
                    status: 404,
                    error: 'Habitación no encontrada'
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener la habitación'
            };
        }
    }

    // Método para obtener todas las camas de una habitación
    async getBeds(departmentId, roomId) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                const room = data[departmentId].rooms.find(r => r.id === roomId);
                if (room) {
                    return {
                        status: 200,
                        data: room.beds
                    };
                }
                return {
                    status: 404,
                    error: 'Habitación no encontrada'
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener las camas'
            };
        }
    }

    // Método para obtener una cama específica
    async getBed(departmentId, roomId, bedId) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                const room = data[departmentId].rooms.find(r => r.id === roomId);
                if (room) {
                    const bed = room.beds.find(b => b.id === bedId);
                    if (bed) {
                        return {
                            status: 200,
                            data: bed
                        };
                    }
                    return {
                        status: 404,
                        error: 'Cama no encontrada'
                    };
                }
                return {
                    status: 404,
                    error: 'Habitación no encontrada'
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener la cama'
            };
        }
    }

    // Método para actualizar los medicamentos de un paciente
    async updateMedications(departmentId, roomId, bedId, medications) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                const room = data[departmentId].rooms.find(r => r.id === roomId);
                if (room) {
                    const bed = room.beds.find(b => b.id === bedId);
                    if (bed) {
                        bed.medications = medications;
                        localStorage.setItem('hospitalData', JSON.stringify(data));
                        return {
                            status: 200,
                            data: bed
                        };
                    }
                    return {
                        status: 404,
                        error: 'Cama no encontrada'
                    };
                }
                return {
                    status: 404,
                    error: 'Habitación no encontrada'
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al actualizar los medicamentos'
            };
        }
    }

    // Método para actualizar el estado de los medicamentos
    async updateMedicationStatus(departmentId, roomId, bedId, date, medicationStatus) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                const room = data[departmentId].rooms.find(r => r.id === roomId);
                if (room) {
                    const bed = room.beds.find(b => b.id === bedId);
                    if (bed) {
                        if (!bed.medicationsStatus) {
                            bed.medicationsStatus = {};
                        }
                        bed.medicationsStatus[date] = medicationStatus;
                        localStorage.setItem('hospitalData', JSON.stringify(data));
                        return {
                            status: 200,
                            data: bed.medicationsStatus
                        };
                    }
                    return {
                        status: 404,
                        error: 'Cama no encontrada'
                    };
                }
                return {
                    status: 404,
                    error: 'Habitación no encontrada'
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al actualizar el estado de los medicamentos'
            };
        }
    }

    // Método para actualizar las notas diarias
    async updateDailyNotes(departmentId, roomId, bedId, date, notes) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            if (data[departmentId]) {
                const room = data[departmentId].rooms.find(r => r.id === roomId);
                if (room) {
                    const bed = room.beds.find(b => b.id === bedId);
                    if (bed) {
                        if (!bed.dailyNotes) {
                            bed.dailyNotes = {};
                        }
                        bed.dailyNotes[date] = notes;
                        localStorage.setItem('hospitalData', JSON.stringify(data));
                        return {
                            status: 200,
                            data: bed.dailyNotes
                        };
                    }
                    return {
                        status: 404,
                        error: 'Cama no encontrada'
                    };
                }
                return {
                    status: 404,
                    error: 'Habitación no encontrada'
                };
            }
            return {
                status: 404,
                error: 'Departamento no encontrado'
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al actualizar las notas diarias'
            };
        }
    }

    // Método para obtener los pacientes por fecha
    async getPatientsByDate(date) {
        try {
            const data = JSON.parse(localStorage.getItem('hospitalData'));
            const patients = [];

            for (const deptKey in data) {
                data[deptKey].rooms.forEach(room => {
                    room.beds.forEach(bed => {
                        if (bed.admissionDate === date || 
                            (bed.medicationsStatus && bed.medicationsStatus[date]) ||
                            (bed.admissionDate && bed.admissionDate <= date)) {
                            patients.push({
                                ...bed,
                                department: data[deptKey].name,
                                roomId: room.id
                            });
                        }
                    });
                });
            }

            return {
                status: 200,
                data: patients
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Error al obtener los pacientes por fecha'
            };
        }
    }

    // Método para resetear los datos
    resetData() {
        localStorage.setItem('hospitalData', JSON.stringify(hospitalData));
    }
}

// Exportar la instancia de la API
const hospitalAPI = new HospitalAPI(); 