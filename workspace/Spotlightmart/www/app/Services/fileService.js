SpotlightmartApp.factory('FileService', function() {
    return {
        getDirectory: function(parentDir, newDir) {
            parentDir.getDirectory(
                newDir, 
                { create : true },
                function (dirEntry) {
                    console.log(parentDir + "/" + newDir + " created successfully");
                    return { success : true, objDirectory = dirEntry };
                },
                functon (error) {
                    console.log("Failed to create " + parentDir + "/" + newDir + " with error : %o", error);
                    return { success : false, error : error };
                }
            )
        },
        writeJSONToFile: function(dirEntry, fileName, jsonObj) {
            dirEntry.getFile(fileName,
                {create: true, exclusive: false},
                function (fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function () {
                            console.log(dirEntry + fileName + " saved successfully");
                        }
                        
                        fileWriter.onerror + function (error) {
                            console.log(dirEntry + fileName + " saved with error : %o", error);
                        }
                        
                        fileWriter.write(jsobObj);
                    })
                },
                function (error) {
                    console.log("Failed to get file obj for " + dirEntry + fileName + " with error : %o", error);
                }
            );
        }
    }
});