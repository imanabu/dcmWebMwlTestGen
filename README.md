# dcmWebMwlTestGen

## Modality Worklist Test Generator and QIDO Server System

Manabu Tokunaga, GitHub: imanabu
Version 0.0.10
Release Date: 2021-07-23

## New Features and Changes

### 0.0.10
* Fixed the limit parameter issue

### 0.0.9

* Security Update
* Compiler compatilibity updates for TypeScript 3.9.6

### 0.0.8

* The limit parameter will just return the requested number of entries. If you want the old behavior
  you can add force=true parameter, which will generate the number of new entries for the amount listed.
  
* The new default is 5000 encounters per 12 hour period now. Please test your stuff to be able to handle
  this volume, which is a medium-large hospital size during an epidemic scare and such.
  
  Reminder: The algorithm is that we generate 
  new encounters = (total number of encounter/day) * (fraction of the time elapsed from the last call)
  
  We will drop the same number of the encounters as the new ones from the list. Consider that 
  dropped patients are the ones that have been discharged. I know this is not really realistic but
  it should do for now and any more complex patient flow, you should handle that on your end from
  the generated list.

### 0.0.6 - 0.0.7

* Manually add new patient-studies with your choice of information. 
  Use this to create a correlated encounter already on the EHR/PACS.

### 0.0.5

* The configuration is now a plain json and stored in config/appConfig.js
* More realistic generation of encounters now. Repeated default /api/studies will only provide
  list changes as specified in the configuration. So for example, if you set up 12 encounter per hour,
  only 12 new patients will be ordered in that hour. And the queue will automatically remove the
  people to maintain the size as specified by the `defaultMax`.
  
* New `?houlry=number` URL parameter can also use to specify the hourly patient addition rate.
  New patients will be added and the same number of existing ones will fall off the list.
  This will emulate clinics completing exams.
  New generation is computed on an hourly rate basis from the last generation. 
  
* URL `limit` and `hourly` parameters will persist for the duration of the server's lifecycle.
  Once the `limit` or `hourly` in a query is used that value will persist and will be used
  for next request even without the limit and hourly parameter *if* `persistConfig` is true.
  
  By default the configuration is set to 96 encounters for 8 hours or 12 new encounters per hour.
  
* In preparation for public access, rate and quantity limit is now enforceable and configurable.

## Fixed In This Release

No bugs

## Introduction

When you are testing or a demo-ing a PACS or a modality, we often need to start from a Modality Worklist 
and I always needed some ways of automatically generating them and I also want them to look somewhat
real and gender correct in terms of how the names are presented.

So I wrote a Node/Express app to generate a bunch of visits with hospital departments
associated, and serve them up via the DICOM QIDO /studies API. Because I do need to map the
departments with real existing ones at the hospital, you can also configure realistic
clinical department configurations as well.

I am keeping this as simple as possible without a asking you to configure Java or MongoDB or MySQL.


## What It Does

It auto-generates fairly realistic Modality Worklist entries for testing the workflow. We often need
to test this from the MWL all the way to acquisition in our mobile photo app ZenSnapMD.com

As such you can also use this to generate visits to feed the rest of your test workflow.

Among the things this generates are;

* Realistic people names, correct with genders. Patient, Referring and Performing doctor names
are generated along with fairly unique MRN, Accession and truly unique Study and Instance UIDs.
  
  Names are synthesized by combining the list of names from a recent US Census data, so
  even how the names sound are fairly modern.
  
  Note that MRN/Accession are time based but the top digits are truncated so it might repeat some day.
  
  The age of the patients are synthesized based on a random pick but will range from
  anywhere from 0 to 95 years old based on the date of generation. We could be more
  realistic and use a standard age distribution, but I did not do that (yet).
  
* Study dates are today's as you generate the worklist.

It also has a UI to show/demonstrate you what it generates and show the resulting worklist
items as a list or the raw JSON data.

### List View of the Worklist Generated

![Screen 1](scerenshots/2019-04-08_13-23-57.png)

### JSON View of the Worklist Generated

![Screen 2](scerenshots/2019-04-08_13-24-14.png)

## How Does It Work?

When the DICOM QIDO request is made for /studies it returns the MWL entries 
(instead of modality studies).

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

## What Works For This Version and What Does Not

### Bare-Bone DICOM Web QIDO-GET Behavior

`http://localhost:3000/api/studies`

At this point no date range query nor 
element level query is supported. (You are welcome to add those things. Just fork it.)
Go ahead and specify them but they will be ignored.

Only exception to that is that it supports `?limit=number` can be used to request the generation quantity.
This is limited to 250 by configuration, but can be changed. 1000s of entries can be generated quickly.

The default is hardwired to 10.

Example with Limit: `http://localhost:3000/api/studies?limit=200`

## Configuring Departments and Associated Reasons for Study

There is a department configuration file called `Config.ts` at the root of the project.
You can edit this to create various departments and some strings to select study reasons
randomly.

    [
       {
          "active": true,
          "department": "1234",
          "modalities": [ "CT", "VL" ],
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
* modalities: The modalities the department uses or requests.
* reasons: List of the list of study reasons that can happen in this department.

## About the UI

Use the [UI Client](http://localhost:3000) to see what it generates. The codes are
under [client](/client) directory. The client is compiled as ES5 target to allow
its use in not-so-modern browsers. The server uses the latest Node and ES2015.

This is also an example of writing an HTML client program. 

## Contributions Are Welcome

* For minor stuff or you are not a code but have ideas please file the request in the Git Issues.

* Please stick with Mithril.js + webpack.

* Let's keep this to work only with npm and no other build tools.
