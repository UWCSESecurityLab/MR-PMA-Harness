using System.Collections;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;

public class HandPresence : MonoBehaviour
{
    public GameObject card;

    public Material[] cards;
    public int numRed;
    public int numTotal;
    public int shownTime;
    public float flipTime;
    public float viewTime;
    public float timer;
    private bool started;
    private bool stopflip = false;
    public  static bool hit_target = false;

    private int i;
    private bool imageSet = false;
    private Renderer backRenderer;
    private double nextUpdate=0.7;
    private int pre;
    private int iter = 50;
    private int answer = 0;

    void Start()
    {
        backRenderer = card.transform.Find("Back").GetComponent<Renderer>();
        Debug.Log(backRenderer.materials.Length);

    }
    
    void Update()
    {
        timer += Time.deltaTime;
        if (Input.GetMouseButtonDown(0))
        {
            imageSet = true;
        }
        
        if(Time.time>=nextUpdate && imageSet && iter >0){
        
            started = true;
            card.transform.eulerAngles = new Vector3(-270, 0, 0);
            timer = 0f;
            imageSet = true;
            System.Random rand = new System.Random();
            int randomCard = rand.Next(52);
            
            while (randomCard == pre){
                randomCard = rand.Next(52);
            }
            if (randomCard>25){
                answer +=1;
            }
            if (answer == 15){
                hit_target = true;
            }
            Debug.Log(answer);
            if (answer < 15){
                backRenderer.material = cards[randomCard];
                pre = randomCard;
                nextUpdate=Time.time+0.5;
                iter -=1;
                }
        }

        if(Time.time<nextUpdate && imageSet){
            started = true;
            card.transform.eulerAngles = new Vector3(-270, 0, 0);
            timer = 0f;
            imageSet = true;
            System.Random rand = new System.Random();
            int randomCard = rand.Next(53);
            nextUpdate=Mathf.FloorToInt(Time.time)+1;
        }

        if (Input.GetMouseButtonDown(1))
        {
            started = false;
            card.transform.eulerAngles = new Vector3(0, 0, 0);
            timer = 0f;
        }

        if (started && stopflip)
        {
            Debug.Log("flip is called");
            if (timer > 2 * (flipTime + viewTime))
            {
                timer -= 2 * (flipTime + viewTime);
                i++;
            }
            if (i < numTotal)
            {
                if (timer < flipTime)
                {
                    card.transform.Rotate(Vector3.forward * Time.deltaTime * (180.0f / flipTime));
                    imageSet = false;
                }
                else if (timer < flipTime + viewTime)
                {
                    card.transform.eulerAngles = new Vector3(-90, 0, 180);
                }
                else if (timer < 2 * flipTime + viewTime)
                {
                    card.transform.Rotate(Vector3.back * Time.deltaTime * (180.0f / flipTime));
                }
                else if (timer < 2 * (flipTime + viewTime))
                {
                    card.transform.eulerAngles = new Vector3(-90, 0, 0);
                    if (!imageSet)
                    {
                        Debug.Log(backRenderer.material);
                        System.Random rand = new System.Random();
                        int randomCard = rand.Next(52);
                        backRenderer.material = cards[randomCard];
                        imageSet = true;
                    }
                }
            } else
            {
                started = false;
            }
        }
    }
}
