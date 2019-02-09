def diff(a, b):
	if a == 0:
		return 0
	return (b-a)/a

def compare(registerav, login):
	if(len(registerav)!=len(login)):
		#throw error something wrong
		return {"error": "Something went wrong"}
	blankSum = 0
	heldSum = 0
	for i in range(0, len(registerav)):
		blanktmp = diff(registerav[i]['blank'],login[i]['blank'])**2
		blankSum += blanktmp
		heldtmp = diff(registerav[i]['held'],login[i]['held'])**2
		heldSum += heldtmp
	blankAns = (blankSum/len(registerav))**.5
	heldAns = (heldSum/len(registerav))**.5
	return {"blank": blankAns,
	"held": heldAns}

def getavg(register1, register2):
	registeravg = []
	if(len(register1)!=len(register2)):
		#throw error something wrong
		print("Something went wrong")
		return None
	for i in range(0, len(register1)):
		registeravg.append({})
		registeravg[i]['code'] = (register1[i]['code'])
		registeravg[i]['blank'] = (register1[i]['blank']+register2[i]['blank'])/2
		registeravg[i]['held'] = (register1[i]['held']+register2[i]['held'])/2
	return registeravg


def movavg(registeravg, login):
	registerav = registeravg.copy()
	for i in range(0, len(registerav)):
		registerav[i]['blank'] = registerav[i]['blank']*.9+login[i]['blank']*.1
		registerav[i]['held'] = registerav[i]['held']*.9+login[i]['held']*.1
	return registerav
