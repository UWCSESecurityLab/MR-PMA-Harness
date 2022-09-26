// #if ZED_OPENCV_FOR_UNITY

// using System.Collections;
// using System.Collections.Generic;
// using sl;
// using UnityEngine;

// /// <summary>
// /// Moves the object to the marker's location each grab, and turns itself off when it's not seen if desired. 
// /// This is a stripped down vesion of MarkerObject_MoveToMarker meant to be as simple an implementation as
// /// possible for use as a reference. The regular MarkerObject_MoveToMarker includes smoothing and hide-delay
// /// features that make it more useful. 
// /// </summary>
// /// 
// static class Globals
// {
//     // global int
//     public static int counter = 60;
//     public static bool check = true;
//     public static readonly Vector3 Zero_Scale = Vector3.zero;
//     public static Vector3 save = Vector3.zero;
// }
// public class MarkerObject_MoveToMarkerSimple : MarkerObject
// {
//     public int attack_sequence;

//     // NetworkInstance = GameObject.FindObjectOfType(typeof(NetworkClient));
//     public override void MarkerDetectedSingle(Vector3 worldposition, Quaternion worldrotation)
//     {
//         bool check = true;
//         if (check == true)
//         {
//             if (attack_sequence == 1 && NetworkClient.color_attack_2 == true){
//                 worldposition.x += 0.01f;
//                 worldposition.y += 0.19f;
//                 worldposition.z -= 0.1f;
//                 transform.position = worldposition;
//                 transform.rotation = worldrotation;
//                 gameObject.SetActive(true);
//                 Destroy(gameObject, 2);

//             }
//             if (attack_sequence == 2  && NetworkClient.color_attack_4 == true ){
//                 worldposition.x += 0.01f;
//                 worldposition.y += 0.19f;
//                 worldposition.z -= 0.1f;
//                 transform.position = worldposition;
//                 transform.rotation = worldrotation;
//                 gameObject.SetActive(true);
//                 Destroy(gameObject, 2);
//             }
//             check = false;
//         }

       



//         //Debug.LogFormat("color_attack is {0}", NetworkClient.color_attack_2);

//         //   Globals.counter -= 1;
//         //   if (Globals.counter+time < 60 & Globals.counter + time>0)
//         //   {
//         //gameObject.SetActive(true);
//         //gameObject.SetActive(true);
//         //Debug.LogFormat("this is the color attack signal: {0}",NetworkClient.color_attack_2);

//         // if (attacknumber == 2 && NetworkClient.color_attack_2 == true)
//         // {
//         //     Debug.Log("this is attack 2");
//         //     gameObject.SetActive(true);
//         //     Destroy(gameObject, 1);
//         // }

//         // if (attacknumber == 4 && NetworkClient.color_attack_4 == true)
//         // {
//         //     Debug.Log("this is attack 4");
//         //     gameObject.SetActive(true);
//         //     //Destroy(gameObject, 1);
//         //    // gameObject.GetComponent<Renderer>().material.color.a = 1.0f;
//         // }
//         //    }
//         // if (Globals.counter+time <0)
//         //    {
//         //        Globals.save = transform.localScale;
//         //        transform.localScale = Globals.Zero_Scale;
//         //    }

//     }
//     IEnumerator CoUpdate()
//     {
//         yield return new WaitForSeconds(1);
//     }
//     public override void MarkerNotDetected()
//     {
//         gameObject.SetActive(false);
//     }
// }

// #endif

