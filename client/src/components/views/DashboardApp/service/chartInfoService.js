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
        console.log("서버에서 permitlist result?? ",result)
        return result;
    }

    return {getUserTotal, getVisitorTotal, getRoomsTotal, getUsersCount, getPermitList}
}
export default chartInfoService();