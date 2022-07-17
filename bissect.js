function insertrow(i,a,b,c,func_c,roundoff)
{
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    cell1.innerHTML = i;
    let cell2 = document.createElement('td');
    cell2.innerHTML = a.toFixed(roundoff);
    let cell3 = document.createElement('td');
    cell3.innerHTML = b.toFixed(roundoff);
    let cell4 = document.createElement('td');
    cell4.innerHTML = c.toFixed(roundoff);
    let cell5 = document.createElement('td');
    cell5.innerHTML = func_c.toFixed(roundoff);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    tbody.appendChild(row);
    row.setAttribute('class','row-class')
}
function startcalc()
{
    let x;
    let m = document.getElementById('mistake')
    let e = document.getElementById('expression').value;
    let a = document.getElementById('1stinterval').value;
    let b = document.getElementById('2ndinterval').value;
    let epsilon = document.getElementById('tolerance').value;
    if(epsilon == "")
    {
        epsilon = parseFloat(0.001)
    }
    else
    {
        epsilon = parseFloat(epsilon)
    }
    let org_e = e 
    table = document.getElementById('table')
    if(table.style.display !== 'none')
    {
        tbody = document.getElementById('table-body')
        let arr = Array.from(tbody.rows)
        for(let i=0;i<arr.length;i++)
        {
            document.getElementsByClassName('row-class')[0].remove()
        }
    }
    e = e.replace('sin','Math.sin')
    e = e.replace("cos" , "Math.cos")
    e = e.replace("exp" , "Math.exp")
    e = e.replace("tan" , "Math.tan")
    e = e.replace("sqrt" , "Math.sqrt")
    e = e.replace("ln","Math.log")
    e = e.replace("pi","Math.pi")
    let roundoff = epsilon
    count = 0
    while(true)
    {
        if(roundoff >= 1)
        {
            count = count + 1;
            break;
        }
        else
        {
            roundoff = roundoff * 10
            count = count + 1;
        }
    }
    fl_a = parseFloat(a)
    fl_b = parseFloat(b)
    x = fl_a
    let ans1 = eval(e)
    x = fl_b
    let ans2 = eval(e)
    if(ans1 * ans2 > 0)
    {
        table.style.display = 'none'
        m.style.display = 'block'
        ans = document.getElementById('answer')
        ans.innerText = ''
        m.innerText = 'Wrong Interval Entered'
    }
    else{
        m.style.display = 'none'
        table.style.display = 'table'
        let i = 1
        if(ans1 < 0)
        {
            while(true)
            {
                let mid_val = parseFloat((fl_a+fl_b)/2)
                x = mid_val
                let func_c = eval(e)
                if(func_c == 0 || Math.abs(parseFloat(func_c)) <= parseFloat(epsilon))
                {
                    insertrow(i,fl_a,fl_b,mid_val,func_c,count)
                    ans = document.getElementById('answer')
                    ans.innerText = `The root of ${org_e} is ${mid_val.toFixed(count)} after ${i} iterations`
                    break
                }
                if(func_c < 0)
                {
                    insertrow(i,fl_a,fl_b,mid_val,func_c,count)
                    fl_a = mid_val
                    i = i + 1
                    continue
                }
                if(func_c > 0)
                {
                    insertrow(i,fl_a,fl_b,mid_val,func_c,count)
                    fl_b = mid_val
                    i = i + 1
                    continue
                }
        }   
        }
        if(ans2 < 0)
        {
            [fl_a,fl_b] = [fl_b,fl_a]
            while(true)
            {
                let mid_val = parseFloat((fl_a+fl_b)/2)
                x = mid_val
                func_c = eval(e)
                if(func_c == 0 || Math.abs(parseFloat(func_c)) <= parseFloat(epsilon))
                {
                    insertrow(i,fl_a,fl_b,mid_val,func_c,count)
                    ans = document.getElementById('answer')
                    ans.innerText = `The root of ${org_e} is ${mid_val.toFixed(count)} after ${i} iterations`
                    break
                }
                if(func_c < 0)
                {
                    insertrow(i,fl_a,fl_b,mid_val,func_c,count)
                    fl_a = mid_val
                    i = i + 1
                    continue
                }
                if(func_c > 0)
                {
                    insertrow(i,fl_a,fl_b,mid_val,func_c,count)
                    fl_b = mid_val
                    i = i + 1
                    continue
                }
            }   
        }        
    }
}