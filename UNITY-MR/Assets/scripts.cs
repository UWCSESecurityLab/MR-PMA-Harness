using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class scripts : MonoBehaviour
{
    public AudioSource audioSource;
    public SimpleNoteVR SimpleNoteVR;

    // Start is called before the first frame update
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            SimpleNoteVR.Instance.Notify_Hold("Hello Worlds");
            audioSource.Play();
        }
    }
}
