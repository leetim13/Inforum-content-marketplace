import { Http } from '../_helpers';
import { history } from '../_helpers';

export const campaignService = {
    getCampaignImage,
    getAll,
    getAllByBank
};

function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
    localStorage.clear();
}

async function getCampaignImage(id) {
    return await Http.get(`/campaigns/${id}/image`)
    .then(res => {
        return res.data;
    })
    .catch(handleError);
}

async function getAll() {
    return await Http.get(`/campaigns`)
    .then(res => {
        localStorage.setItem('campaigns', JSON.stringify(res.data));
        return res.data;
    })
    .catch(handleError);
}

async function getAllByBank(bankId) {
    return await Http.get(`banks/${bankId}/campaigns`)
    .then(res => {
        localStorage.setItem('campaigns', JSON.stringify(res.data));
        return res.data;
    })
    .catch(handleError);
}

function handleError(err) {
    if (err.response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        history.go(0);
    }
    return Promise.reject(err.response.data.message)
}