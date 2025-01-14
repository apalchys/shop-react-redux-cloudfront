import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    if (files.item(0).type !== 'text/csv') {
      setFile('');
      return;
    }
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile('');
  };

  const uploadFile = async (e: any) => {
    // Get the presigned URL
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios({
        method: 'GET',
        url,
        headers: { Authorization: 'Basic ' + authToken },
        params: {
          name: encodeURIComponent(file.name),
        },
      });
      console.log('File to upload: ', file.name);
      console.log('Uploading to: ', response.data);
      const result = await fetch(response.data.url, {
        method: 'PUT',
        body: file,
      });
      console.log('Result: ', result);
      setFile('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
