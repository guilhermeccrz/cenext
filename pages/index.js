import React, { useState, useCallback, useRef, useEffect } from 'react';
import Head from 'next/head';
import '../public/styles.global.css';
import InputPhone from '../components/input-phone';
import InputText  from '../components/input-text';
import InputEmail from '../components/input-email';
import ReactCrop from 'react-image-crop';

export default function Home() {
  const state = {
    fullName: {
      value: '',
      isValid: '',
    },
    email: {
      value: '',
      isValid: '',
    },
    department: {
      value: '',
      isValid: '',
    },
    phone: {
      value: '',
      isValid: '',
    },
    image: {
      isValid: '',
    },
    form: {
      isValid: null,
    },
  };

  const imgRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 4 / 4 });
  const [previewUrl, setPreviewUrl] = useState();

  const [fullName, setFullName] = useState(state.fullName);
  const [email, setEmail] = useState(state.email);
  const [department, setDepartment] = useState(state.department);
  const [phone, setPhone] = useState(state.phone);
  const [image, setImage] = useState(state.image);
  const [form, setForm] = useState(state.form);
  const [sentForm, setSentForm] = useState(false);

  useEffect(() => {
    validateForm();
  }, [fullName, email, department, phone, image]);

  
  const validateForm = () => {
    if(fullName.isValid == 'valid' && email.isValid == 'valid' && department.isValid == 'valid' && phone.isValid == 'valid' && image.isValid == 'valid' ) {
      handleForm(true);
    } else {
      handleForm(false);
    }
  }
    
  const onChangeFullName = (e) => {
    const value = e.target.value;
    const isValid = value.match(/.{4,}/) ? 'valid' : 'invalid';
    setFullName({value, isValid});
  }

  const onChangeEmail = (e) => {
    const value = e.target.value;
    const isValid = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? 'valid' : 'invalid';
    setEmail({value, isValid});
  }

  const onChangeDepartment = (e) => {
    const value = e.target.value;
    const isValid = value.match(/.{4,}/) ? 'valid' : 'invalid';
    setDepartment({value, isValid});
  }

  const onChangePhone = (e) => {
    const value = e.target.value;
    const isValid = value.match(/.{14,}/) ? 'valid' : 'invalid';
    setPhone({value, isValid});
  }

  const onChangeImage = (value) => {
    const isValid = value ? 'valid' : 'invalid';
    setImage({value, isValid});
  }

  const handleForm = (isValid) => {
    setForm({isValid});
  }

  const submitForm = (data) => {
    fetch('/api/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      res.status === 200 ? setSentForm(true) : '';
    })
  }

  const getPayload = () => {
    return {
      fullName, email, department, phone, image
    }
  }

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      onChangeImage(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  const makeClientCrop = async crop => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, 'newFile.jpeg');
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Challenge eNext - Guilherme Cruz</title>
      </Head>

      <main>
        <h1 className="title"> Challenge <strong>eNext</strong></h1>
        <p className="description">Usando <code>React/NextJS</code></p>

        <div className="grid">
          <div className="card">
            <form onSubmit={e => {
                  e.preventDefault()
                  submitForm(getPayload())
            }}>
              <InputText name="fullName" className={fullName.isValid} value={fullName.value  || ''} onChange={onChangeFullName} placeholder="Nome completo" required />
              <InputEmail name="email" className={email.isValid} value={email.value  || ''} onChange={onChangeEmail} placeholder="E-mail" required />
              <InputText name="department" className={department.isValid} value={department.value  || ''} onChange={onChangeDepartment} placeholder="Departamento" required />
              <InputPhone name="phone" className={phone.isValid} value={phone.value  || ''} onChange={onChangePhone}  placeholder="Telefone" required />
              <div><input type="file" accept="image/*" onChange={onSelectFile} /></div>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={makeClientCrop}
              />
              {previewUrl && <img className="preview" alt="Crop preview" src={previewUrl} />}
              {
                !sentForm &&
                <button className={form.isValid ? 'valid': 'invalid'} disabled={!form.isValid}>Registrar</button>
              } 
              {
                sentForm &&
                <div className="success">Registro completo ✔</div>
              } 
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
