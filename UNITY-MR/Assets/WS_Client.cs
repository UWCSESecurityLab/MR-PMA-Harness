using WebSocketSharp;
using UnityEngine;

public class WS_Client : MonoBehaviour
{
    WebSocket ws;
    void Start()
    {
        ws = new WebSocket("ws://localhost:8080");
        ws.OnMessage += (sender, e) =>
        {
            print("Message received from" + (sender) + ", Data : " + e.Data);
            Debug.Log("Message received from"  + (sender) + ", Data : " + e.Data);
        };
        ws.Connect();
    }

    // Update is called once per frame
    void Update()
    {
        if (ws == null)
        {
            return;
        }
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ws.Send("Hello");
        }
    }
}
