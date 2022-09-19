import client from "../"

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출!!");

    const {
      body: {
        data: { shopName, shopMenu, shopPrice },
      },
    } = req;
    console.log("백엔드 로그: ", shopName, shopMenu, shopPrice);

    const result = await client.user.create({
      date: {
        shopName,
        shopMenu,
        shopPrice,
      },
    })
  }
  res.status(200).json({});
  //여기에서 .json의 역할은 <- 이곳으로 값을 넣겠다 
}
