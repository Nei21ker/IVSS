export const DEPARTMENTS = {
    traumatologia: {
        name: "Traumatología",
        icon: "fas fa-bone",
        rooms: ["T-01", "T-02", "T-03"],
        bedsPerRoom: 6
    },
    ginecologia: {
        name: "Ginecología",
        icon: "fas fa-venus",
        rooms: ["G-01", "G-02", "G-03"],
        bedsPerRoom: 6
    },
    pediatria: {
        name: "Pediatría",
        icon: "fas fa-child",
        rooms: ["P-01", "P-02", "P-03"],
        bedsPerRoom: 6
    },
    medicina_interna: {
        name: "Medicina Interna",
        icon: "fas fa-stethoscope",
        rooms: ["MI-01", "MI-02", "MI-03"],
        bedsPerRoom: 6
    }
};

export const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const DATE_FORMAT = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};

export const THEME = {
    light: {
        background: '#f0f2f5',
        text: '#333333',
        primary: '#d9534f',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    },
    dark: {
        background: '#1a202c',
        text: '#e2e8f0',
        primary: '#d9534f',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    }
}; 