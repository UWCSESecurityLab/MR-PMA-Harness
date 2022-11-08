#if ZED_OPENCV_FOR_UNITY

using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class MarkerObject_MoveToMarker : MarkerObject
{
    /// <summary>
    /// If true, will disable (set inactive) this object's gameObject when it was visible, but then is no longer visible. 
    /// </summary>
    [Tooltip("If true, will disable (set inactive) this object's gameObject when it was visible, but then is no longer visible. ")]
    public bool disableWhenNotSeen = true;

    /// <summary>
    /// How many consecutive frames of detection does this object not have to be seen before it's disabled.
    /// Used to avoid flickering when noise causes frames not to be detected for a short time
    /// when they're actually in view of the camera.
    /// </summary>
    [Tooltip("How many consecutive frames of detection does this object not have to be seen before it's disabled.\r\n" +
        "Used to avoid flickering when noise causes frames not to be detected for a short time " +
        "when they're actually in view of the camera.")]
    public int missedFramesUntilDisabled = 10;
    /// <summary>
    /// How many frames in a row the corresponding marker was not seen. 
    /// </summary>
    private int hiddenFramesCount = 0;

    /// <summary>
    /// How many frames to use to smooth marker position/rotation updates.
    /// Larger numbers reduce jitter from detection inaccuracy, but add latency to the marker's movements.
    /// </summary>
    [Tooltip("How many frames to use to smooth marker position/rotation updates. " +
        "Larger numbers reduce jitter from detection inaccuracy, but add latency to the marker's movements.")]
    public int smoothedFrames = 8;
    public int attack_sequence = 2;
    public bool poker = false;

    /// <summary>
    /// List of last X positions updated, where X is the max number of smoothed frames (unless that many haven't happened yet).
    /// Used for smoothing positions. 
    /// </summary>
    private CappedStack<Vector3> positionStack;
    /// <summary>
    /// List of last X rotations updated, where X is the max number of smoothed frames (unless that many haven't happened yet).
    /// Used for smoothing rotations. 
    /// </summary>
    private CappedStack<Quaternion> rotationStack;

    private void Awake()
    {
        positionStack = new CappedStack<Vector3>(smoothedFrames);
        rotationStack = new CappedStack<Quaternion>(smoothedFrames);
    }

    public override void MarkerDetectedSingle(Vector3 worldposition, Quaternion worldrotation)
    {

        if (poker){
            bool check = true;
            if (check){
                worldposition.x += 0.45f;
                worldposition.y += 0.11f;
                worldposition.z -= 0.22f;
                transform.position = worldposition;
                transform.rotation = worldrotation;
                gameObject.SetActive(true);
                if (HandPresence.hit_target){
                    Destroy(gameObject);
                }
            }
            check = false;
        }
        else{
        bool check1 = true;
        // some finetuning to make the attack cube placed accurately
        if ( attack_sequence==2 && NetworkClient.color_attack_2){
            worldposition.x -= 0.05f;
            worldposition.y += 0.1f;
            worldposition.z -= 0.11f;
            transform.position = worldposition;
            transform.rotation = worldrotation;
            gameObject.SetActive(true);
            Destroy(gameObject, 2);

            }
        if ( attack_sequence==1 && NetworkClient.color_attack_1 ){
            worldposition.x += 0.02f;
            worldposition.y += 0.1f;
            worldposition.z -= 0.2f;
            transform.position = worldposition;
            transform.rotation = worldrotation;
            gameObject.SetActive(true);
            Destroy(gameObject, 2);

            }
        if ( attack_sequence==3 && NetworkClient.color_attack_5){
            worldposition.x -= 0.02f;
            worldposition.y += 0.12f;
            worldposition.z -= 0.15f;
            transform.position = worldposition;
            transform.rotation = worldrotation;
            gameObject.SetActive(true);
            Destroy(gameObject, 2);

            }
        if ( attack_sequence==4 && NetworkClient.color_attack_4){
            worldposition.x -= 0.05f;
            worldposition.y += 0.11f;
            worldposition.z -= 0.15f;
            transform.position = worldposition;
            transform.rotation = worldrotation;
            gameObject.SetActive(true);
            Destroy(gameObject, 2);

            }

        if ( attack_sequence==5 && NetworkClient.color_attack_7){
            worldposition.x -= 0.02f;
            worldposition.y += 0.12f;
            worldposition.z -= 0.15f;
            transform.position = worldposition;
            transform.rotation = worldrotation;
            gameObject.SetActive(true);
            Destroy(gameObject, 2);

            }
        if ( attack_sequence==6 && NetworkClient.color_attack_6){
            worldposition.x -= 0.05f;
            worldposition.y += 0.11f;
            worldposition.z -= 0.15f;
            transform.position = worldposition;
            transform.rotation = worldrotation;
            gameObject.SetActive(true);
            Destroy(gameObject, 2);

            }
        check1 = false;
        }
    }

    public override void MarkerNotDetected()
    {
        if (disableWhenNotSeen)
        {
            hiddenFramesCount++;
            if (hiddenFramesCount >= missedFramesUntilDisabled)
            {
                gameObject.SetActive(false);
            }
        }
    }

    private Vector3 GetAveragePosition()
    {
        Vector3 sumvector = Vector3.zero;
        foreach (Vector3 vec in positionStack)
        {
            sumvector += vec;
        }
        return sumvector / positionStack.Count;
    }

    private Quaternion GetAverageRotation()
    {
        Vector4 sumquatvalues = Vector4.zero;
        foreach (Quaternion quat in rotationStack)
        {
            sumquatvalues.x += quat.x;
            sumquatvalues.y += quat.y;
            sumquatvalues.z += quat.z;
            sumquatvalues.w += quat.w;
        }

        Quaternion returnquat = new Quaternion();
        sumquatvalues /= rotationStack.Count;
        returnquat.x = sumquatvalues.x;
        returnquat.y = sumquatvalues.y;
        returnquat.z = sumquatvalues.z;
        returnquat.w = sumquatvalues.w;

        return returnquat;
    }
}

#endif