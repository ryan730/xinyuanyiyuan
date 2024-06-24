import { request } from "@/utils";
import Mock from "../../config/menu";
import domain from "@/service/domain";

// userList: "用户列表",
// orderList: "订单列表",
// productList: "商品列表",
// testList: "评测列表",
//topicList

export class ListService {
  public static async getUserMenu() {
    return new Promise((resolve) => {
      resolve(Mock.menu);
    });
  }

  public static async payoutList(params: any) {
    let timer = ``;
    if (params.time_start && params.time_end) {
      timer = `&time_start=${params.time_start}&time_end=${params.time_end}`;
    }
    let res = await request({
      url: domain.suffix + `/psyadm/payoutList?page=${params.page}${timer}`,
      method: "get",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async downLoad(params: any) {
    let timer = ``;
    if (params.time_start && params.time_end) {
      timer = `&time_start=${params.time_start}&time_end=${params.time_end}`;
    }
    let url = domain.suffix + `/psyadm/${params.type}?download=1${timer}`
    let res = await request({
      url,
      method: "get",
      responseType: 'blob'
      //params,
    });
    if (res instanceof Blob) {
      ///const blob = new Blob([res], { type: 'text/csv'})
      let link = document.createElement('a')
      link.setAttribute('target', '_blank');
      let url = window.URL.createObjectURL(res)
      link.href = url
      link.download = decodeURI(`${params.time_start}-${params.time_end}.csv`)
      link.style.display = 'none'
      ///document.body.appendChild(link)
      link.click()
      //link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return {...res};
    }
  }

  public static async userList(params: any) {
    let timer = ``;
    if (params.time_start && params.time_end) {
      timer = `&time_start=${params.time_start}&time_end=${params.time_end}`;
    }
    let res = await request({
      url: domain.suffix + `/psyadm/userList?page=${params.page}${timer}`,
      method: "post",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async orderList(params: any) {
    let timer = ``;
    if (params.time_start && params.time_end) {
      timer = `&time_start=${params.time_start}&time_end=${params.time_end}`;
    }
    let res = await request({
      url: domain.suffix + `/psyadm/orderList?page=${params.page}${timer}`,
      method: "post",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async productList(params: any) {
    let res = await request({
      url: domain.suffix + `/psyadm/productList?page=${params.page}`,
      method: "post",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async testList(params: any) {
    let res = await request({
      url: domain.suffix + `/psyadm/testList?page=${params.page}&pid=${params.pid}`,
      method: "post",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async topicList(params: any) {
    let res = await request({
      url: domain.suffix + `/psyadm/topicList?page=${params.page}&tid=${params.tid}`,
      //method: "post",
      params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async transfer(params: any = {}) {
    let res = await request({
      url: domain.suffix + `/psyadm/transfer`,
      //method: "post",
      params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async checkTransfer(params: any = {}) {
    let res = await request({
      url: domain.suffix + `/psyadm/checkTransfer`,
      //method: "post",
      params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }


}


export class statisticsService {
  public static async order(params: any) {
    let res = await request({
      url: domain.suffix1 + `/psyadmin/distribution/order`,
      method: "get",
      //mode: 'no-cors',
      //params,
    });

    if (res.code == 0) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }

    // const response = await fetch(domain.suffix1 + `/psyadmin/distribution/order`, {
    //   method: 'GET',
    //   mode: 'no-cors',
    // });
  }

  public static async purse(params: any) {
    let res = await request({
      url: domain.suffix1 + `/psyadmin/distribution/purse`,
      method: "get",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }

  public static async test(params: any) {
    let res = await request({
      url: domain.suffix1 + `/psyadmin/distribution/test`,
      method: "get",
      //params,
    });

    if (res.code == 1) {
      return {
        data: res?.data,
        code: 200,
        message: "成功",
        success: true,
      }
    } else {
      return { ...res };
    }
  }
}