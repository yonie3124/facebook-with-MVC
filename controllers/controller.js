const {Message} = require('../models/Message')
let y = ''

const getHomepage = (req, res) => {
    Message.find().sort({ created_at: -1 })
    .then(result =>  {
        y = result
        const x = result.forEach(element => {
            console.log(element)
        });
        res.render('index', {result, err: false}) }  
             )
    .catch(err => console.log(err))
   
}

const postNewMessage = (req, res) => {
    if (req.method === 'GET') {
        res.render('addMessage',{err:false});
    }
    if (req.method === 'POST') {
        const message = new Message(req.body)
        if(req.body.message.length < 40 && req.body.name.length < 15){
            message.save()
            .then(result => {
                res.redirect('/feed')
            })
            .catch(err => {
               res.render('addMessage', {err:err.errors})
            })
        } else{
            res.render('index',{ result:y, err: false})
        }
       
    }
}
const showOneMessage= (req, res) => {
    Message.findById({_id: req.params.id})
    .then(result =>  {
       console.log(result)
        res.render('showOne', {result}) }  
             )
    .catch(err => console.log(err))
    }
  
    const updateOneMessage = (req, res) => {
        if (req.method === 'GET') {
            Message.findById(req.params.id)
                .then((result) => {
                    res.render('editMessage', { result })
                })
                .catch(err => console.log(err))
        }
        if (req.method === 'POST') {
            Message.findByIdAndUpdate(req.params.id)
                .then(result => {
                    result.name = req.body.name
                    result.message = req.body.message
                    result.save()
                        .then(() => {
                            res.redirect('/feed')
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }
    const deleteOneMessage = (req, res) => {
        Message.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/feed')
            })
            .catch(err => console.log(err))
    }
module.exports = {
    getHomepage,
    postNewMessage,
    showOneMessage,
    updateOneMessage,
    deleteOneMessage,
}

