const { NotificationTicket } = require('../models/index');
const { Op } =  require("sequelize");

class TicketRepository {
    
    async getAll(){
        try{
            return await NotificationTicket.findAll();
        }
        catch(err){
            console.log(err);
        }
    }
    
    async create(data){
        try{
            return await NotificationTicket.create(data);
        }
        catch(err){
            console.log(err);
        }
    }

    async get(filter){
        try{
            const tickets = await NotificationTicket.findAll({
               where : {
                status : filter.status,
                notificationTime : {
                    [Op.lte] : new Date()
                }
               }
            });
            return tickets;
        }
        catch (err){
            throw err;
        }
    }

    async update(id,data){
       try{
           const ticket = await NotificationTicket.findByPk(id);
           if(data.status) ticket.status = data.status;
           await ticket.save();
           return ticket;
           
       } catch(err){
        console.log(err);
       }
    }
    
}

module.exports = TicketRepository;