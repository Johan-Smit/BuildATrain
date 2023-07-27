f = open("trainRoute.txt", "w")

trainSpeed = 2

y = 65.0;
for i in range(20,245,trainSpeed):
	f.write("trainRoute.push([{x},{y},1.5708]);\n".format(x=i,y=y))
	x= i

r = 1.65
while(r<3.14):
	for i in range(0,3,1):
		y = y+1
		x = x+1
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r +0.15
	
for i in range(95,212,trainSpeed):
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=x,y=i))
	y = i
	
while(r<4.71):
	for i in range(0,3,1):
		y = y+1
		x = x-1
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r +0.15
	
for i in range(241,70,-trainSpeed):
	f.write("trainRoute.push([{x},{y},4.71]);\n".format(x=i,y=y))
	x = i
	
while(r>3.14):
	for i in range(0,4,1):
		y = y+0.3
		x = x-0.3
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r -0.25
	
for i in range(255,330,trainSpeed):
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=x,y=i))
	y = i
	
while(r>1.57):
	for i in range(0,4,1):
		y = y+0.3
		x = x+0.3
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r -0.25
	
for i in range(70,395,trainSpeed):
	f.write("trainRoute.push([{x},{y},1.5708]);\n".format(x=i,y=y))
	x= i

while(r<3.14):
	for i in range(0,3,1):
		y = y+1
		x = x+1
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r +0.15
	
for i in range(369,400,trainSpeed):
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=x,y=i))
	y = i
	
for i in range(0,100):
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=0,y=0))

for i in range(0,206,trainSpeed):
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=455,y=i))
	y = i

x = 455
r = 3.14
while(r>1.57):
	for i in range(0,4,1):
		y = y+0.3
		x = x+0.3
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r -0.25

for i in range(463,540,trainSpeed):
	f.write("trainRoute.push([{x},{y},1.5708]);\n".format(x=i,y=y))
	x= i
	
while(r<3.14):
	for i in range(0,3,1):
		y = y+1
		x = x+1
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r +0.15

for i in range(245,355,trainSpeed):
	y = i
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=575,y=i))
	
while(r>1.57):
	for i in range(0,4,1):
		y = y+0.3
		x = x+0.3
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r -0.25

for i in range(582,650,trainSpeed):
	f.write("trainRoute.push([{x},{y},1.5708]);\n".format(x=i,y=361))
	x= i
	
while(r>0):
	for i in range(0,4,1):
		y = y+0.3
		x = x+0.3
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r -0.25
	
for i in range(368,125,-trainSpeed):
	f.write("trainRoute.push([{x},{y},0]);\n".format(x=665,y=i))
	y= i
	
while(r<1.57):
	for i in range(0,3,1):
		y = y-1
		x = x+1
		f.write("trainRoute.push([{x},{y},{n}]);\n".format(x=x,y=y,n=r))
	r =r +0.15

for i in range(688,800,trainSpeed):
	f.write("trainRoute.push([{x},{y},1.57]);\n".format(x=i,y=90))
	x= i
	
for i in range(0,100):
	f.write("trainRoute.push([{x},{y},3.14]);\n".format(x=0,y=0))

f.close()
