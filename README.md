# dcmWebMwlTestGen

## Modality Worklist Test Generator for DICOM Web

Manabu Tokunaga, GitHub: imanabu
Version 0.0

Note this is still very bare bone but I plan to add more functionality as we build more 
complex tests.

For now what we needed was to generate a bunch of visits with hospital departments associated,
and because I do need to map the departments with real existing ones at the hospital, I have
to make them configurable. 

## What It Does

It auto-generates somewhat realistic Modality Worklist entries for testing the workflow. We often need
to test this from the MWL all the way to acquisition in our mobile photo app ZenSnapMD.com

As such you can also use this to generate visits to feed the rest of your test workflow.

Among the things this generates are;

* Realistic people names, correct with genders. Patient, Referring and Performing doctor names are
  generated along with MRN, Accession and truly unique Study and Instance UIDs.
  
* Study dates are today's as you generate the worklist.

## How Does It Work?

When the DICOM QIDO request is made for /studies it returns the MWL entries (instead of modality studies).

## How To Install, Run and Improve It

This is a NodeJS/Express project and written in TypeScript and so you would do the following.

1. Install NodeJS and npm
2. Install TypeScript 3.x or later
3. Compile and Run

Once NodeJS and npm is installed in your environment, you would do the following,

1. `npm install`
2. `npm build`
3. `npm start`
4. `http://localhost:3000` for a UI to demonstrate the data it generates
5. `http://localhost:3000/api/studies` to fire a QIDO GET for studies (worklist)

And by default it should be listening at the Port 3000 of your local system.

## What Works

### Bare-Bone QIDO-GET Behavior

`http://localhost:3000/api/studies`

We really do not need any fancy QIDO query stuff here. So no date range query nor 
element level query is supported. (You are welcome to add those things. Just fork it.)
Go ahead and specify them but they will be ignored.

Only exception to that is that tt supports `?limit=number` so that you can 
pull 100's and 1000's of entries at a time, and it will be very quick to do so. 
The default is set to 10.

Example with Limit: `http://localhost:3000/api/studies?limit=1000`

## Configuring Departments and Associated Reasons for Study

There is a department configuration file called `Config.ts` at the root of the project.
You can edit this to create various departments and some strings to select study reasons
randomly.

    [
       {
          "active": true,
          "department": "1234",
          "reasons": [
             "Minor Burn",
             "Fall",
             "Cut",
             "Fracture"
          ]
       },...
    ]
       
* active: Means this entry will be used. 
* department: It can be a code or a string like ER/ED. It maps to (0008,1040)
* reasons: List of the list of study reasons that can happen in this department.

## Contributions Are Welcome

* Please stick with Mithril.js + webpack. It's simple and adequate for this purpose. Do not
  change this into React.js or Vue and such that we don't use.

* I try to do away everything with npm and do not add Gulp or stuff like that. 
