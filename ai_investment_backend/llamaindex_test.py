import os

from llama_index.llms import OpenAI
from llama_index import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from IPython.display import Markdown, display
from dotenv import load_dotenv
from llama_index.vector_stores import AstraDBVectorStore


# 加载环境变量
load_dotenv()

# 设置环境变量
ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# 初始化AstraDB存储
astra_db_store = AstraDBVectorStore(
    token=ASTRA_DB_APPLICATION_TOKEN,
    api_endpoint=ASTRA_DB_API_ENDPOINT,
    collection_name="test",  # 替换为您的集合名称your_collection_name
    embedding_dimension=1536,  # 嵌入维度，根据您使用的模型可能需要调整
)

# 假设您从API获取的文本已保存到"./data"目录下的文件中
# documents = SimpleDirectoryReader("./data").load_data()

# print(documents)

# 创建存储上下文
# storage_context = StorageContext.from_defaults(vector_store=astra_db_store)

# 构建索引并将文档存储到Astra DB
# index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)

# 查询引擎
# query_engine = index.as_query_engine()
# query_string = "As a invester give a summery of apple future plan"
# response = query_engine.query(query_string)

# print("查询结果:", response.response)

# ===============

storage_context = StorageContext.from_defaults(vector_store=astra_db_store)

index = VectorStoreIndex.from_vector_store(astra_db_store)

# 转换为查询引擎
query_engine = index.as_query_engine()

# 执行查询
query_string = "As a invester give a summery of apple future plan"
response = query_engine.query(query_string)

print("查询结果:", response.response)
