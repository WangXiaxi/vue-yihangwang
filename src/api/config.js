let hostname = window.location.hostname

let locaHostName = '192.168.100.55'

export const URL = hostname === locaHostName ? 'http://www.51ehang.com' : `http://${window.location.host}`
