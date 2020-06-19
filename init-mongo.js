db.createUser({
  user: 'stefko',
  pwd: '123',
  roles: [
    {
      role: 'readWrite',
      db: 'lococom'
    }
  ]
})

db.lococom
  .insert({"msg":"initDatabase"})