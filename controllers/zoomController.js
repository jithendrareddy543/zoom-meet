const axios = require('axios')

const MeetModel = require('../models/meetModel')

const emailHelper = require('../utilities/emailHelper')

const zoomMeet = async (req) => { // function used to generate zoom meeting link
    const meetingUrl = "https://api.zoom.us/v2/users/me/meetings"
    let payload = '', key='https://zoom.us/oauth/authorize?response_type=KsuBLQD7vlyoFXFWjb4RQGh67WCgo-LmQ&client_id=hYMeErA2QRqQ_l4J7VDHaw&redirect_uri=http://localhost:3000/app/createMeet'    ;
    let obj={
        url: meetingUrl,
        method: 'post',
        data: payload,
        headers: {
            Authorization: `Bearer + ${key}`
        }
    }
    try {
        const { data } = await axios(obj);
        return data
    } catch (error ) {
    return error.message
}
}
exports.zoomAuth = async (req, res) => {    // function used to authorize zoom with local client

    try {    
        const tokenResponse = await axios.post('https://zoom.us/oauth/authorize', null, {
            params: {
              response_type: 'code',
              client_id: process.env.clientId,
              redirect_uri:'http://localhost:3000/app/scheduleMeet',
            },
        });
        console.log(tokenResponse)


       return res.status(201).json({ message: "Meeting scheduled successfully", response: tokenResponse.data });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while creating zoom meetings" });
    }
}

exports.scheduleMeet = async (req, res) => {    // function to get access token and creates data in DB

    try {

        const base64Key = `${process.env.clientId}:${process.env.clientSecret}`;
        const decodedKey = Buffer.from(base64Key, 'utf-8').toString('base64');
        
        const data = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                code: req.query.code,
                grant_type: 'client_credentials',
                redirect_uri: 'http://localhost:3000/app/scheduleMeet',
                headers: {
                    Authorization: `Basic ${decodedKey}`,
                    Content_Type: 'application/x-www-form-urlencoded'
                }
            },
        });

        const { description, teacherName, emails, meetDate } = req.body;
        let scheduleDate = new Date(meetDate)
        let url = await zoomMeet(req) // function used to get zoom meeting link
        const meetModel = await MeetModel.create({ description, teacherName, emails, meetDate: scheduleDate, url: '' });
        await emailHelper.sendMeetingMail(emails);  // function used to send mails to students


        res.status(201).json({ message: "Meeting scheduled successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while creating zoom meetings" });
    }
}