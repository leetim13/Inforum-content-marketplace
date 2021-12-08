import { Http } from '../_helpers';
import { history } from '../_helpers';

export const campaignService = {
    getCampaignImage,
    getAll,
    getAllByBank,
    getAllCampaignWithImages
};

async function getCampaignImage(id) {
    return await Http.get(`/campaigns/${id}/image`)
    .then(res => {
        console.log(res);
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

async function getAllCampaignWithImages(campaigns) {
    const promises = [];
    const tmpCampaigns = [];
    for (let i = 0; i < campaigns.length; i++) {
        promises.push(Http.get(`/campaigns/${campaigns[i].id}/image`)
        .then(res => { 
            tmpCampaigns.push({ ...campaigns[i], image: res.data })
        })
        .catch(handleError));
    }
    await Promise.all(promises);
    return tmpCampaigns;
}

function handleError(err) {
    if (err.response.status === 401) {
        history.push("/unauthorized");
    }
    return Promise.reject(err.response.data.message)
}