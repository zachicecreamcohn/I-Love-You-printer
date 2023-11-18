fetch("http://ec2-18-224-181-157.us-east-2.compute.amazonaws.com:3000/api/insert",{
    method: "POST",
    headers: {"Content-Type": "application/json",
    },
    body: JSON.stringify({note: "Note 3"}),
});