const dotenv = require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database

const bucketName = process.env.SUPABASE_BUCKET_NAME || dotenv.parsed.SUPABASE_BUCKET_NAME;
const supabaseLink = process.env.SUPABASE_LINK || dotenv.parsed.SUPABASE_LINK;
const supabaseAuth = process.env.SUPABASE_AUTH || dotenv.parsed.SUPABASE_AUTH;

const supabase = createClient(supabaseLink, supabaseAuth)

// Get all the files from bucket
async function getAllFiles() {
    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list();
    if (error) {
        throw error;
    }
    return data;
}

async function getFileUrl(fileName) {
    // Generate signed URL for the file
    const { data, error } = await supabase
    .storage
    .from(bucketName)
    .createSignedUrl(fileName, 600); // 60 seconds expiry time

    if (error) {
        throw error;
    }
    return data.signedUrl;
}

exports.getAllFiles = getAllFiles;
exports.getFileUrl = getFileUrl;