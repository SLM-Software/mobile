CT6App.factory('DB', function($q) {
    var db=null;
    return {
        init: function () {
            db=window.sqlitePlugin.openDatabase({name:"6WP.db", createFromLocation:1});
            console.log("Database opened successfully");
        },
        query: function(query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            console.log("Executing "+query+" with bindings : %o", bindings);
            
            db.transaction(function(transaction) {
                transaction.executeSql(query, bindings, function(transaction, result) {
                    console.log("Finished executing query");
                    deferred.resolve(result);
                }, function(transaction, error) {
                    console.log("Error when executing query : %o", error);
                    deferred.reject(error);
                });
            });
            return deferred.promise;
        },
        fetchAll: function(result) {
            var output = [];
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            console.log("Returning %o", output);        
            return output;
        },
        fetch: function(result) {
            console.log("Returning %o",result.rows.item(0));
            return result.rows.item(0);
        }
    }
})
.factory('BackExercises', function(DB) {
    return {
        all: function() {
            DB.init();
            return DB.query('SELECT * FROM BackExercises WHERE Deleted=0')
            .then(function(result){
                return DB.fetchAll(result);
            });
        },
        getByID: function(id) {
            DB.init();
            return DB.query('SELECT * FROM BackExercises WHERE ID=?',[id])
            .then(function(result) {
                return DB.fetch(result);
            });
        },
        insertExercise: function(name) {
            DB.init();
            return DB.query('INSERT INTO BackExercises (Name) VALUES (?)',[name])
            .then(function(result){
                return result;
            });
        },
        deleteExercise: function(id) {
            DB.init();
            return DB.query('UPDATE BackExercises SET Deleted=1 WHERE ID = '+id)
            .then(function(result) {
                return result;
            });
        }
    }
})
.factory('BicepsExercises', function(DB) {
    return {
        all: function() {
            DB.init();
            return DB.query('SELECT * FROM BicepsExercises WHERE Deleted=0')
            .then(function(result) {
                return DB.fetchAll(result);
            });
        },
        getByID: function(id) {
            DB.init();
            return DB.query('SELECT * FROM BicepsExercises WHERE ID=?',[id])
            .then(function(result) {
                return DB.fetch(result);
            });
        },
        insertExercise: function(name) {
            DB.init();
            return DB.query('INSERT INTO BicepsExercises (Name) VALUES (?)',[name])
            .then(function(result){
                return result;
            });
        },
        deleteExercise: function(id) {
            DB.init();
            return DB.query('UPDATE BicepsExercises SET Deleted=1 WHERE ID = '+id)
            .then(function(result) {
                return result;
            });
        }
    }
})
.factory('ShoulderExercises', function(DB) {
    return {
        all: function() {
            DB.init();
            return DB.query('SELECT * FROM ShoulderExercises WHERE Deleted=0')
            .then(function(result) {
                return DB.fetchAll(result);
            });
        },
        getByID: function(id) {
            DB.init();
            return DB.query('SELECT * FROM ShoulderExercises WHERE ID=?',[id])
            .then(function(result) {
                return DB.fetch(result);
            });
        },
        insertExercise: function(name) {
            DB.init();
            return DB.query('INSERT INTO ShoulderExercises (Name) VALUES (?)',[name])
            .then(function(result){
                return result;
            });
        },
        deleteExercise: function(id) {
            DB.init();
            return DB.query('UPDATE ShoulderExercises SET Deleted=1 WHERE ID = '+id)
            .then(function(result) {
                return result;
            });
        }
    }
})
.factory('Configs', function(DB) {
    return {
        all: function() {
            DB.init();
            return DB.query('SELECT * FROM Configs')
            .then(function(result) {
                return DB.fetchAll(result);
            })
        },
        delete: function() {
            DB.init();
            return DB.query('DELETE FROM Configs')
            .then(function(result) {
                return result;
            });
        },
        insert: function(data) {
            DB.init();
            return DB.query("INSERT INTO Configs(StartDate, UOM, Bench1RM, Squat1RM, Deadlift1RM, BackID, BicepsID, ShoulderID, CurrentCycleStartDate, NextCycleStartDate ) VALUES (?,?,?,?,?,?,?,?,?,?)", data)
            .then(function(result) {
                return result;
            });
        },
        updateThisCycleStartDate: function(strDate) {
            DB.init();
            return DB.query("UPDATE Configs SET ThisCycleStartDate=?", [strDate])
            .then(function(result) {
                return result;
            });
        },
        updateNextCycleStartDate: function(strDate) {
            DB.init();
            return DB.query("UPDATE Configs SET NextCycleStartDate=?", [strDate])
            .then(function(result) {
                return result;
            });
        },
        reset1RM: function(workoutType, factor) {
            DB.init();
            return DB.query("UPDATE Configs SET "+workoutType+"=Round(("+workoutType+"*"+factor+")/5,0)*5")
            .then(function(result) {
                return result; 
            });
        },
        update1RM: function(workoutType, weight) {
            DB.init();
            console.log("Executing " + "UPDATE Configs SET Prev"+workoutType+"="+workoutType+","+workoutType+"="+weight);
            return DB.query("UPDATE Configs SET Prev"+workoutType+"="+workoutType+","+workoutType+"="+weight)
            .then(function(result) {
                return result; 
            });
        },
        saveWeek6Option: function(option) {
            DB.init();
            return DB.query("UPDATE Configs SET Week6Option=?",[option])
            .then(function(result) {
                return result;
            });
        },
        resetAccessoryExercise: function(exName) {
            DB.init();
            return DB.query("UPDATE Configs SET "+exName+"=null")
            .then(function(result) {
                return result;
            });
        }
    }
})
.factory('WorkoutDaysWorkout', function(DB) {
    return {
        getCurrentDayWorkout: function(week, day) {
            DB.init();
            return DB.query("SELECT null as ID, ww.DayID, ww.WorkoutID, ww.WorkoutTypeID, wt.Name, ww.Sets, ww.Reps, ww.WeightFactor, '' AS Weight, '' AS WorksetWeight, '' AS WorksetRep, NULL AS WorksetDone FROM WorkoutDayWorkout ww JOIN WorkoutDays wd ON ww.DayID=wd.DayID JOIN WorkoutTypes wt ON ww.WorkoutTypeID = wt.WorkoutTypeID WHERE wd.WeekID=? AND wd.WeekDay=?", [week, day])
            .then(function(result) {
                return DB.fetchAll(result);
            });
        }
    }
})
.factory('Weeks', function(DB) {
    return {
        getName: function(week) {
            DB.init();
            return DB.query('SELECT Name FROM Weeks WHERE WeekID=?', [week])
            .then(function(result) {
                return DB.fetchAll(result);
            });
        }
    }
})
.factory('WorkoutDaysCompleted', function(DB) {
    return {
        saveWorkout: function(dayID, oDate, workoutID, workoutTypeID, weight, weightFactor, sets, reps, workoutName, worksetWeight, worksetRep, worksetDone) {
            DB.init();
            return DB.query('INSERT INTO WorkoutDaysCompleted (DayID, Date, WorkoutID, WorkoutTypeID, Weight, WeightFactor, Sets, Reps, WorkoutName, WorksetWeight, WorksetRep, WorksetDone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [dayID, oDate, workoutID, workoutTypeID, weight, weightFactor, sets, reps, workoutName, worksetWeight, worksetRep, worksetDone])
            .then(function(result) {
                return result;
            });
        },
        updateWorkout: function(dayID, oDate, workoutID, workoutTypeID, weight, weightFactor, sets, reps, workoutName, worksetWeight, worksetRep, worksetDone,ID) {
            DB.init();
            return DB.query('UPDATE WorkoutDaysCompleted SET DayID=?, Date=?, WorkoutID=?, WorkoutTypeID=?, Weight=?, WeightFactor=?, Sets=?, Reps=?, WorkoutName=?, WorksetWeight=?, WorksetRep=?, WorksetDone=? WHERE ID=?', [dayID, oDate, workoutID, workoutTypeID, weight, weightFactor, sets, reps, workoutName, worksetWeight, worksetRep, worksetDone, ID])
            .then(function(result) {
                return result;
            });
        },
        getByDate: function(strDate) {
            DB.init();
            return DB.query('SELECT * FROM WorkoutDaysCompleted WHERE Date = ? ORDER BY ID ASC',[strDate])
            .then(function(resp) {
                return DB.fetchAll(resp);
            });
        }
    }
})
.factory('OptionalExercises', function(DB) {
    return {
        all: function() {
            DB.init();
            return DB.query('SELECT * FROM OptionalExercises WHERE Deleted=0')
            .then(function(result){
                return DB.fetchAll(result);
            });
        },
        getByID: function(id) {
            DB.init();
            return DB.query('SELECT * FROM OptionalExercises WHERE ID=?',[id])
            .then(function(result) {
                return DB.fetch(result);
            });
        },
        insertExercise: function(name) {
            DB.init();
            return DB.query('INSERT INTO OptionalExercises (Name) VALUES (?)',[name])
            .then(function(result){
                return result;
            });
        },
        deleteExercise: function(id) {
            DB.init();
            return DB.query('UPDATE OptionalExercises SET Deleted=1 WHERE ID = '+id)
            .then(function(result) {
                return result;
            });
        }
    }
});
