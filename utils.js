// Date formatting utilities
export const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export const getCurrentDateFormatted = () => {
    return formatDate(new Date());
};

export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

// Theme utilities
export const getStoredTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

export const setStoredTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

// Data validation utilities
export const validatePatientData = (patientData) => {
    const requiredFields = ['id', 'name', 'admissionDate', 'reasonForAdmission', 'bloodType'];
    const missingFields = requiredFields.filter(field => !patientData[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    if (!isValidDate(patientData.admissionDate)) {
        throw new Error('Invalid admission date');
    }
    
    return true;
};

export const validateMedicationData = (medicationData) => {
    if (!medicationData.name || typeof medicationData.name !== 'string') {
        throw new Error('Invalid medication name');
    }
    return true;
};

// DOM utilities
export const createElementWithClasses = (tag, classes) => {
    const element = document.createElement(tag);
    if (classes) {
        element.className = classes;
    }
    return element;
};

export const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

// Error handling utilities
export const handleError = (error, context = '') => {
    console.error(`Error ${context}:`, error);
    // You could implement more sophisticated error handling here
    // For example, showing a toast notification or updating a status message
};

// Data processing utilities
export const groupPatientsByDepartment = (patients, departments) => {
    return patients.reduce((acc, patient) => {
        const departmentKey = Object.keys(departments).find(key => 
            patient.id.startsWith(departments[key].rooms[0].charAt(0)));
        
        if (departmentKey) {
            if (!acc[departmentKey]) {
                acc[departmentKey] = [];
            }
            acc[departmentKey].push(patient);
        }
        
        return acc;
    }, {});
};

export const filterPatientsByDate = (patients, date) => {
    return patients.filter(patient => patient.admissionDate === date);
};

// Search utilities
export const searchPatients = (patients, searchTerm) => {
    const term = searchTerm.toLowerCase();
    return patients.filter(patient => 
        patient.name.toLowerCase().includes(term) ||
        patient.id.toLowerCase().includes(term) ||
        patient.reasonForAdmission.toLowerCase().includes(term)
    );
};

// Export any other utility functions you might need 