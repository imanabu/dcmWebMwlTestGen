# dcmWebMwlTestGen

## Modality Worklist Test Generator for DICOM Web

Manabu Tokunaga, GitHub: imanabu
Version 0.0

Note this is still very bare bone but I plan to add more functionality as we build more complex tests.

## What It Does

It auto-generates somewhat realistic Modality Worklist entries for testing the workflow. We often need
to test this from the MWL all the way to acquisition in our mobile photo app ZenSnapMD.com

Among the things I have are;

* Realistic people names, correct with genders. Patient, Referring and Performing doctor names are
  generated along with MRN, Accession and truly unique Study and Instance UIDs.
  
* Study dates are today's as you generate the worklist.

## How Does It Work?

When the DICOM QIDO request is made for /studies it returns the MWL entries (instead of modality studies).

## How To Install and Run

This is a NodeJS/Express project and written in TypeScript and so you would do the following.

1. Install NodeJS and npm
2. Install TypeScript 3.x or later
3. Compile and Run

Once NodeJS and npm is installed in your environment, you would do the following,

1. `npm install`
2. `npm build`
3. `npm start`

And by default it should be listening at the Port 3000 of your local system.

## What Works

If you do a GET

`http://localhost:3000/api/studies`

It will return the array of DICOM JSON objects conforming to the DICOM QUIO standard.

# What I Plan To Add

* UI to allow some degree of configurations like the list of study descriptions and modalities.
* Random modalities
* Random study descriptions
* Random departments

