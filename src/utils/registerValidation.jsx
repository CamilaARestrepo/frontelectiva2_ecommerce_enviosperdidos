// src/utils/validation.js

export const validateRegister = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) errors.firstName = 'El nombre es obligatorio';
  if (!data.lastName?.trim()) errors.lastName = 'El apellido es obligatorio';
  if (!data.email?.trim()) errors.email = 'El correo es obligatorio';
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Correo no válido';

  if (!data.password?.trim()) errors.password = 'La contraseña es obligatoria';
  else if (data.password.length < 8)
    errors.password = 'Debe tener al menos 8 caracteres';

  if (!data.idType) errors.idType = 'El tipo de documento es obligatorio';
  if (!data.idNumber?.trim()) errors.idNumber = 'El número de documento es obligatorio';
  if (!data.roleId) errors.roleId = 'El rol es obligatorio';
  if (!data.gender) errors.gender = 'El género es obligatorio';
  if (!data.phone?.trim()) errors.phone = 'El teléfono es obligatorio';
  if (!data.departmentId) errors.departmentId = 'Selecciona un departamento';
  if (!data.cityId) errors.cityId = 'Selecciona una ciudad';
  if (!data.address?.trim()) errors.address = 'La dirección es obligatoria';
  if (!data.neighborhood?.trim()) errors.neighborhood = 'El barrio es obligatorio';

  return errors;
};
