export const isValidPassword = (user, password)=>{
    return bcrypt.compareSync(password, user.password);
}