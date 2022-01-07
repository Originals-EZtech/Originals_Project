import axios from "axios";

const chartInfoService = () => {

    const getUserTotal = async () => {
        const result = await axios.get('/api/chart/users')
        return result;
    }

    const getVisitorTotal = async () => {
        const result = await axios.get('/api/chart/visitors')
        return result;
    }

    const getRoomsTotal = async () => {
        const result = await axios.get('/api/chart/rooms')
        return result;
    }

    const getUsersCount = async () => {
        const result = await axios.get('/api/chart/usertest')
        return result;
    }

    const getPermitList = async () => {
        const result = await axios.get('/api/chart/permitlist')
        return result;
    }

    const changeRole = async (email) => {
        const result = await axios.post('/api/chart/permit',email)
        return result;
    }
    
    const getVisitorCount = async () => {
        const result = await axios.get('/api/chart/count')
        return result;
    }
    
    const getVisitorlist = async () => {
        const result = await axios.get('/api/chart/visitorlist')
        return result;
    }

    const getSignUpList = async () => {
        const result = await axios.get('/api/chart/signuplist')
        console.log("result",result)
        return result;
    }

    return {getUserTotal, getVisitorTotal, getRoomsTotal, getUsersCount, getPermitList, changeRole, getVisitorCount,getVisitorlist, getSignUpList}
}
export default chartInfoService();