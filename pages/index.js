import { useForm } from "react-hook-form";

const ShopForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const fetchShop = async (data) => {
    console.log(data);
    const response = await (
      await fetch("/api/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
    ).json();
    //여기에서 .json의 역할은 결과물이 json으로 자동으로 넘어가겠다
    console.log(response);
  };

  const getShop = async () => {
    console.log("getShop 호출됨");
    const shopName = getValues("shopName");
    const result = await (
      await fetch(`/api/shop?shopName=${shopName}`, {
        method: "GET",
      })
    ).json();
    console.log("result", result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(fetchShop)}>
        <label>가게이름</label>
        <input
          {...register("shopName", {
            required: "this is required",
          })}
          placeholder="가게이름을 입력하세요."
        />
        {errors.shopName && <p>{errors.shopName.message}</p>}

        <label>메뉴</label>
        <input
          {...register("shopMenu", {
            required: "this is required",
          })}
          placeholder="메뉴를 입력하세요."
        />
        {errors.shopMenu && <p>{errors.shopMenu.message}</p>}

        <label>가격</label>
        <input
          {...register("shopPrice", {
            required: "this is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "숫자를 입력해주세요.",
            },
          })}
          placeholder="가격을 입력하세요."
        />
        {errors.shopPrice && <p>{errors.shopPrice.message}</p>}
        <br />
        <button type="submit">입력하기</button>
        <button type="button" onClick={getShop}>
          불러오기
        </button>
        <button type="button" >
          삭제하기
        </button>
      </form>

      <style jsx>
        {`
          form {
            width: 500px;
            height: 500px;
            margin: 100px auto;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-radius: 10px;
            text-align: center;
            padding-top: 50px;
          }
          label {
            display: block;
            margin: 20px 0 0 0;
            font-size: 14px;
            color: #333;
          }
          input {
            width: 300px;
            height: 35px;
            margin: 5px 0 0 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 0 15px;
          }
          button {
            width: 100px;
            height: 40px;
            margin: 30px 10px;
            border: none;
            background: #ccc;
            cursor: pointer;
          }
          p {
            font-size: 14px;
            margin: 0;
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default ShopForm;
