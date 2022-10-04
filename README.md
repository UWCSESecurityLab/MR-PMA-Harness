## MR-PMA-Harness

The repository contains the code for launching and captureing the impact of Perceptual Manipulation Attacks (PMA) in Mixed Reality on end user.

Further details can be found in the paper *"Exploring User Reactions and Mental Models Towards Perceptual Manipulation Attacks in Mixed Reality"* by Kaiming Cheng, Jeffery Tian, Franziska Roesner and Tadayoshi Kohno. 

If you end up building on this research or code as part of a project or publication, please include a reference to the USENIX Security paper:

## Tested Setup

All code of this repository was tested on a Windows 10 machine with Unity version 2019.4.12f1, Oculus Quest 2, and Zed Mini.

## Harness Overview 

Our harness contains two main modules. 

The Mixed Reality Module, which is implemented thorugh Unity, utilized OpenCV and ZED Mini library to generate the PMA content and rendered in MR headset (6).

Server Module, which is implemented through Nodejs, connects the experiment interface (12), database (4), and Mixed Reality Module through socket.io (11).

<img
  src="images/MR%20Testbed%20Figure.jpg"
  title="System Overview"
  style="display: inline-block; margin: 0 auto; max-width: 450px">

### Mixed Reality Module
* `UNITY-MR/Assets` - contains PMA code, library asset, scenes, and plugins. 
* `UNITY-MR/Assets/MR_Scenes` - contains the experiment VR Scenes.

### Server Module
* `Nodejs+DB/DB` - contains code to connect nodejs to MongoDB (URL already anonymized)
* `Nodejs+DB/public` - contains code for experiment interface (need to set up live server first to access local file)
* `Nodejs+DB/server.js` - run this file to set up the server 

## Contact
If you have any questions, feel free to contact Kaiming (kaimingc@cs.washington.edu) 

## Licensing
For ethical considerations, code and data is covered by a modified BSD 3-Clause License which restricts the use of the code to academic purposes and which specifically prohibits commercial applications.

Any redistribution or use of this software must be limited to the purposes of non-commercial scientific research or non-commercial education. Any other use, in particular any use for commercial purposes, is prohibited. This includes, without limitation, incorporation in a commercial product, use in a commercial service, or production of other artefacts for commercial purposes.
