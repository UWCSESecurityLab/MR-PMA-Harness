using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;

public class NetworkClient : SocketIOComponent
{
    public  int counter=0;
    public  static bool color_attack_1 = false;
    public  static bool color_attack_2 = false;
    public  static bool color_attack_3 = false;
    public  static bool color_attack_4 = false;
    public  static bool color_attack_5 = false;
    public  static bool color_attack_6 = false;

    public  static bool color_attack_7 = false;

    public  static bool memory_attack = false;
    public  bool color_attack = false;
    public  static bool bunny = false;


    public  string ClientID { get; private set; }
    public  string MemoryID { get; private set; }

    public  string temp = "temp";

    public override void Start()
    {
        base.Start();
        setupEvents();
        Debug.LogFormat("network established");
    }

    public override void Update()
    {
        base.Update();
        On("start_test",(E)=>{
                Debug.LogFormat(E.data.ToString());
            }
        );
        On("colorattack",(E)=>{
            if (!color_attack_2){
                Debug.LogFormat("color_attack_2 connect");

            }
            color_attack_2 = true;
                if (E.data["color2"].ToString() != ""){
                    color_attack_2 = true;
                }
            }
        );
        On("colorattack2",(E)=>{
            if (!color_attack_1){
                Debug.LogFormat("color_attack_1 connect");
            }
            color_attack_1 = true;

            }
        );
        On("colorattackred2",(E)=>{

            if (!color_attack_5){
                Debug.LogFormat("color_attack_5 connect");
            }
            color_attack_5 = true;
            }
        );
        On("colorattack3",(E)=>{
            if (!color_attack_1){
                Debug.LogFormat("color_attack_1 connect");
            }
            color_attack_6 = true;

            }
        );
        On("colorattackred3",(E)=>{

            if (!color_attack_5){
                Debug.LogFormat("color_attack_5 connect");
            }
            color_attack_7 = true;
            }
        );
        On("colorattackred",(E)=>{

            if (!color_attack_4){
                Debug.LogFormat("color_attack_4 connect");
            }            
            color_attack_4 = true;
            }
        );
         On("fire", (E) =>{
 
            FindObjectOfType<AudioManager>().Play("fire");      
            Debug.LogFormat("fire Sound is playing");
  
             });
        On("trigger", (E) =>
        {
            FindObjectOfType<AudioManager>().Play("notification");
            Debug.LogFormat("notification Sound is playing");
        });
        }

    public void setupEvents()
    {
        On("open", (E) =>
        {
            Debug.LogFormat("Connection made to Unity");
        });
    }
}
