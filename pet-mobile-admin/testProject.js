curl -H "Content-Type: application/json" -X POST -d '{"user_id": "123", "coin":100, "success":1, "msg":"OK!" }' "http://192.168.0.1:8001/test"


curl -H "Content-Type: application/json" -X POST -d '{}' "http://api.xinyunyiyun.cn/test/focusList"

curl -H "Content-Type: application/json" -X POST -d '{}' "http://api.xinyunyiyun.cn/user/userLogin?code=12345"

curl -H "Content-Type: application/json" -X POST -d '{}' "http://api.xinyunyiyun.cn/user/userLogin?code=081iYgHa12UxVE0V2ZIa1gZnyj3iYgHF"