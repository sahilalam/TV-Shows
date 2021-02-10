let getdata=async(url)=>{
    let data=await fetch(url);
    data=await data.json();
    return data;
}
let setcol=(col,col2,text,data,text_alignment="",c="col-12")=>{
    let col2col=document.createElement('div');
    col2col.setAttribute("class",`${c} p-1 pt-1 pb-1 m-0`+` ${text_alignment}`);
    
    let bold=document.createElement('b');
    bold.innerText=text;

    col2col.append(bold,`${data}`);
    col2.append(col2col);
    col2.append(col2col);
    col.append(col2);
}

document.getElementById('search').onclick=async()=>{
    try
    {
        let name=document.getElementById('name').value;
        name=(name.length===0)?'girls':name;
        let data= await getdata("http://api.tvmaze.com/search/shows?q="+name);
        
        let row=document.getElementById('content');
        row.innerHTML="";
        for(let i=0;i<data.length && data[i]['show']['image'];i++)
        {
            let col=document.createElement('div');
            col.setAttribute("class","col-lg-4 col-md-5 col-sm-7 col-10 p-0 m-4 text-center columns bg1");

            let col1=document.createElement('div');
            col1.setAttribute("class","col-12 p-0 m-0");

            let img=document.createElement('img');
            img.setAttribute('src',`${data[i]['show']['image']['original']}`);
            img.setAttribute("class","img");
            col1.append(img);
            col.append(col1);

            let col2=document.createElement('div');
            col2.setAttribute("class","row p-0 m-0 text");

            let col2col=document.createElement('div');
            col2col.setAttribute("class","col-12 heading");
            col2col.innerText=`${data[i]['show']['name']}`;
            col2.append(col2col);

            setcol(col,col2,"",data[i]['show']['language'],'text-left','col-5');
            setcol(col,col2,'',(data[i]['show']['rating']['average'])?`${data[i]['show']['rating']['average']}/10`:"Non-rated",'text-right','col-6');
            setcol(col,col2,'Genres: ',data[i]['show']['genres'].join(', '));
            setcol(col,col2,'Premiered: ',`${data[i]['show']['premiered']}`);

            let network=data[i]['show']['network'];
            if(network)
            {
                setcol(col,col2,'Network: ',data[i]['show']['network']['name']+`(${data[i]['show']['network']['country']['name']})`);
            }
            setcol(col,col2,'Status: ',data[i]['show']['status']);

            let timing=data[i]['show']['schedule']['days'].join(", ");
            if(timing.length>0)
            {
                if(data[i]['show']['schedule']['time'].length>0)
                {
                    timing+=` at ${data[i]['show']['schedule']['time']}`;
                }
                setcol(col,col2,'Timing: ',timing);
            }
            row.append(col);
        }
       
    }
    catch(err)
    {
        console.log(err);
    }
}
document.getElementById('search').click();
