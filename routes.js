const notes = require('./db.json');
const fs = require("fs");
let id = 1;

exports.route = (app) => {
    app.get('/api/notes', function(req, res) {
        return res.json(notes);
      });

      app.post("/api/notes", function(req, res) {
        let newNote = {
            "id": id,
            "note": req.body.data
        }
        id++;
        console.log(newNote);
        console.log(req.body);
      
        notes.push(newNote);
        
        let data = JSON.stringify(notes);
        fs.writeFile("db.json", data, function(err){
            if(err) throw err;
            console.log("Created successfully");
        })
      
        res.json(newNote);
      });

      app.delete("/api/notes/:id", function(req, res){
        let deleteId = parseInt(req.params.id);
        console.log(deleteId);
        var arrayIndex = notes.findIndex(x => x.id === deleteId);
        if (arrayIndex > -1){
            notes.splice(arrayIndex, 1);
            let data = JSON.stringify(notes);
            fs.writeFile("db.json", data, function(err){
                if(err) throw err;
                console.log("Created successfully");
            })
        }
        res.send(`successfully deleted note ${deleteId}`);
      });
}