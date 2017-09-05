SpotlightmartApp.factory('FileService', function(window) {
    function errorCallback(error)
    {
        console.log("File I/O Exception : %o", error);
    }
    
    return {
        getDirectory: function(parentDir, newDir) {
            /*
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
            */
        },
        writeJSONToFile: function(dirName, fileName, jsonObj) {
                window.resolveLocalFileSystemURL(dirName,
                    function(dirEntry) {
                        console.log("Directory opened successfully", dirEntry);
                        dirEntry.getFile(fileName,
                            {create: true},
                            function(fileEntry) {
                                console.log("File opened successfully", fileEntry);
                            
                                fileEntry.createWriter(
                                    function(fileWriter) {
                                    
                                        console.log("Writing %o", jsonObj);
                                        fileWriter.write(jsonObj);
                                        console.log("Write successful!");
                                    
                                    },
                                    function (error) {
                                        console.log("File I/O Exception : %o", error);
                                    }
                                );
                            
                            },
                            function (error) {
                                console.log("File I/O Exception : %o", error);
                            }
                        );
                    },
                    function (error) {
                        console.log("File I/O Exception : %o", error);
                    }
                );
        };
    }
});