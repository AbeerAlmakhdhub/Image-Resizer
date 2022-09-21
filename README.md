Image Resizer API

This API uses express as a back-end web application framework for Node.js while taking advantage of sharp's functionalities to resize and process images.

Port: 3000
Provided images:
bike, flowersAndSun, lake, river, town.
Note that you could add more by inserting them in images/original

To run the project:
npm run start

The URL to open the project in the browser: http://localhost:3000

Display an Image (examples):
http://localhost:3000/api/images?imageName=flowersAndSun
![flowersAndSun](Expected_Result/flowersAndSun.jpg)
Resize an Image with the dimensions of width 300 and height 300:
http://localhost:3000/api/images?imageName=flowersAndSun&width=300&height=300 

![flowersAndSun-300x300](Expected_Result/flowersAndSun-300x300.jpg)

--Expected result of the above is provided in the file "Expected_Result"

Scripts:
npm run start // to start the server
npm run test // to run unit tests using Jasmine
npm run testSilent // to run unit tests using Jasmine while ignoring anything but test results
npm run format // to prettify the code
npm run lint //to parse the code

Used npm packages:
typescript
Express
Sharp
Eslint
Prettier
Jasmine
Supertest
