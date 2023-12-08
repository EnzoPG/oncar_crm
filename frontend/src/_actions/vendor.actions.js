import { userService } from '../_services/';
import { history } from '../_helpers';

function getVehicles() {
    return dispatch => {
        let apiEndpoint = 'car/get-all';
        userService.get(apiEndpoint)
            .then((response) => {

                const { data, status } = response;
                const { result } = data;

                if (!result || (!status === 200)) {
                    dispatch(errorOnListing());
                }

                dispatch(changeVehiclesList(result.data));
            }).catch((err) => {
                console.log("Error: ", err);
                dispatch(errorOnListing());
            });
    };
}

function createVehicle(payload) {
    return dispatch => {
        let apiEndpoint = 'car/create';
        userService.post(apiEndpoint, payload)
            .then((response) => {

                const { data, status } = response;
                const { result } = data;

                if (!result || (!status === 200)) {
                    dispatch(errorOnCreation());
                }

                dispatch(successOnCreation(result));
                history.push('/vendor');

            }).catch((err) => {
                console.log('err: ', err);
                dispatch(errorOnCreation());
            });
    }
}

function getVendorById(id) {

    return dispatch => {
        let apiEndpoint = 'car/get-by-id';
        userService.post(apiEndpoint, {
            id
        })
        .then((response) => {

            const { data, status } = response;
            const { result } = data;

            if (!result || (!status === 200)) {
                dispatch(errorOnCreation());
            }

            dispatch(editVendorsDetails(result));

        }).catch((err) => {
            console.log('err: ', err);
            dispatch(errorOnCreation());
        });
    };
}

function onChangeProps(props, event) {
    return dispatch => {
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editVendorInfo(id, payload) {
    return dispatch => {
        let apiEndpoint = 'car/update/' + id;
        userService.put(apiEndpoint, payload)
        .then((response) => {

            const { data, status } = response;
            const { result } = data;

            if (!result || (!status === 200)) {
                dispatch(errorOnCreation());
            }

            dispatch(updatedVehicleInfo());
            history.push('/vendor');

        }).catch((err) => {
            console.log('err: ', err);
            dispatch(errorOnCreation());
        });
    }
}

function deleteVendorById(id) {
    return dispatch => {
        let apiEndpoint = 'car/delete/' + id;
        userService.deleteVehicle(apiEndpoint)
        .then((response) => {

            const { data, status } = response;
            const { result } = data;

            if (!result || (!status === 200)) {
                dispatch(errorOnDelete());
            }

            dispatch(deleteVehicle(result));
            dispatch(vendorAction.getVehicles());
        })
    };
}

export function changeVehiclesList(vehicles) {
    return {
        type: "FETECHED_ALL_VEHICLES",
        vehicles: vehicles
    }
}

export function handleOnChangeProps(props, value) {
    return {
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editVendorsDetails(vehicle) {
    return {
        type: "VENDOR_DETAIL",
        id: vehicle._id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        color: vehicle.color
    }
}

export function updatedVehicleInfo() {
    return {
        type: "VEHICLE_CREATED_OR_UPDATED_SUCCESSFULLY",
        success: true,
        message: "Veículo atualizado com sucesso!",
    }
}

export function successOnCreation(newItem) {
    return {
        type: "VEHICLE_CREATED_OR_UPDATED_SUCCESSFULLY",
        success: true,
        message: "Veículo registrado com sucesso!",
        newItem
    }
}

export function deleteVehicle(deletedVehicle) {
    return {
        type: "VEHICLE_DELETED_SUCCESSFULLY",
        success: true,
        message: "Veículo deletado com sucesso!",
        deletedVehicle
    }
}

export function errorOnCreation() {
    return {
        type: "VEHICLE_CREATION_ERROR",
        error: true,
        message: "Erro ao registrar veículo!"
    }
}

export function errorOnDelete() {
    return {
        type: "VEHICLE_DELETE_ERROR",
        error: true,
        message: "Erro ao deletar veículo!"
    }
}

export function formValidationError() {
    return {
        type: "FORM_VALIDATION_ERROR",
        error: true,
        message: "Por favor, preencha corretamente todos os campos!"
    }
}

export function errorOnListing() {
    return {
        type: "VEHICLE_LISTING_ERROR",
        error: true
    }
}

export const vendorAction = {
    getVehicles,
    getVendorById,
    onChangeProps,
    editVendorInfo,
    createVehicle,
    deleteVendorById,
    formValidationError,
};