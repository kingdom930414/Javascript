let rec mt f xs = 
  match  xs with
  |[]->failwith "Error"
  |x->Node(f x,Empty,Empty)
  |xs->let (left,right)= split xs
  in let Node(v1,lt1,rt1) = Node(v1,mt f left,mt f left)
  in let Node(v2,lt2,rt2) = Node(v2,mt f right,mt f right)
  in Node(f (v1+v2),Node(v1,lt1,rt1),Node(v2,lt2,rt2) ) ;;
  