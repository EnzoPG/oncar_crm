const initialState = {
    anchor: 'left',
    vehicles: [],
    open: false,
    id: '',
    brand: '',
    model: '',
    price: '',
    year: '',
    color: '',
    message: '',
    error: false,
    success: false,
};

export function vendor(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_VEHICLES':
            return {
                ...state,
                vehicles: action.vehicles
            };
        case 'VENDOR_DETAIL':
            return {
                ...state,
                id: action.id,
                brand: action.brand,
                model: action.model,
                price: action.price,
                year: action.year,
                color: action.color,
            };
        case "USER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        case "VEHICLE_CREATION_ERROR":
            return {
                ...state,
                error: action.error,
                message: action.message
            };
        case "VEHICLE_DELETE_ERROR":
            return {
                ...state,
                error: action.error,
                message: action.message
            };
        case "VEHICLE_CREATED_OR_UPDATED_SUCCESSFULLY":

            const vehiclesNewArr = (action.newItem) ? [...state.vehicles, action.newItem] : [...state.vehicles];

            return {
                ...state,
                vehicles: vehiclesNewArr,
                success: action.success,
                message: action.message
            };
        case "VEHICLE_DELETED_SUCCESSFULLY":
            const notDeleted = state.vehicles.filter((item) => item.id !== action.deletedVehicle._id);
            return {
                ...state,
                vehicles: [...notDeleted],
                success: action.success,
                message: action.message
            };
        case "FORM_VALIDATION_ERROR":
            return {
                error: action.error,
                message: action.message
            };
        default:
            return state
    }
}