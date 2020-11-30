import request from "@/utils/request";

export function logout() {
  return request({
    url: "/kong/auth/v1.0/logout_jwt",
    method: "get"
  });
}

export function getPermissions(systemname) {
  return request({
    url: `/kong/rightmanage/v1.0/cur-permissions?systemname=${systemname}`,
    method: "get"
  });
}

export function isSuper() {
  return request({
    url: "/kong/rightmanage/v1.0/cur-user",
    method: "get"
  });
}

export function getUserCompanys() {
  //登录用户能看到的公司
  return request({
    url: "/kong/rightmanage/v1.0/companys",
    method: "get",
    params: { out_tree: false }
  });
}
